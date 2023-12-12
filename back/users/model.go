package users

import (
	"database/sql"
	"fmt"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type User struct {
	Id         int64  `json:"id"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Is_Admin   bool   `json:"is_admin"`
	Session_Id string `json:"session_id"`
}
type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func GetUser(Id int64) (User, error) {
	connected, err := Connect()
	if connected == 1 || err != nil {
		_ = fmt.Errorf("Trouble connecting to the database\n")
		return User{}, err
	}
	defer func() {
		if err := db.Close(); err != nil {
			return
		}
	}()
	rows, err := db.Query("SELECT * FROM users WHERE id = ?", Id)

	var user User
	found := false
	for rows.Next() {
		err = rows.Scan(&user.Id, &user.Name, &user.Surname, &user.Email, &user.Password, &user.Is_Admin, &user.Session_Id)
		if err != nil {
			return User{}, err
		}
		found = true
	}
	if !found {
		fmt.Printf("user not found\n")
		return User{}, nil
	}
	err = rows.Err()
	return user, nil
}

func GetUsers() ([]User, error) {
	connected, err := Connect()
	if err != nil {
		return nil, err
	}

	rows, err := db.Query("SELECT * FROM users")
	defer func(rows *sql.Rows) {
		if err := rows.Err(); err != nil {
			return
		}
	}(rows)

	users := make([]User, 0)
	for rows.Next() {
		var u User
		err := rows.Scan(&u.Id, &u.Name, &u.Surname, &u.Email, &u.Password, &u.Is_Admin, &u.Session_Id)
		users = append(users, u)
		if err != nil {
			return nil, err
		}
	}
	err = rows.Err()
	if connected == 1 || err != nil {
		return nil, err
	}
	return users, nil
}

func CreateUser(user User) (bool, error) {
	connected, err := Connect()
	if connected == 1 {
		fmt.Printf("problem connecting\n")
		return false, nil
	}
	if err != nil {
		fmt.Printf("while connecting, error has occured: %v\n", err)
		return false, err
	}

	readQuery := "SELECT * FROM users WHERE email = ?"
	createQuery := "INSERT INTO users (name, surname, email, password, is_admin, session_id) VALUES (?, ?, ?, ?, ?, ?)"

	var u User
	if err := db.QueryRow(readQuery, user.Email).Scan(&u.Id, &u.Name, &u.Surname, &u.Email, &u.Password, &u.Is_Admin, &u.Session_Id); err != nil {
		if err != sql.ErrNoRows {
			fmt.Println(u)
			fmt.Printf("There is another user with this email, consider logging in\n")
			return false, nil
		}
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		fmt.Printf("problem hashing\n")
		return false, err
	}
	//during request, do TRUE OR FALSE on is_admin, not 0 or 1 you IDIOT
	_, err = db.Exec(createQuery, user.Name, user.Surname, user.Email, hashedPassword, user.Is_Admin, uuid.NewString())
	if err != nil {
		fmt.Printf("problem executing\n")
		return false, err
	}
	return true, nil
}

func UpdateUser(newUser User, Id int64) (bool, error) {
	connected, err := Connect()
	if connected == 1 {
		fmt.Printf("problem connecting to the database\n")
		return false, nil
	}
	if err != nil {
		fmt.Printf("error connecting to the db, %v\n", err)
		return false, err
	}
	defer db.Close()

	readQuery := "SELECT * FROM users WHERE id = ?"
	updateQuery := "UPDATE users SET name = ?, surname = ?, email = ?, password = ?, is_admin = ? WHERE id = ?"

	var existingU User
	err = db.QueryRow(readQuery, Id).Scan(
		&existingU.Id, &existingU.Name, &existingU.Surname,
		&existingU.Email, &existingU.Password, &existingU.Is_Admin, &existingU.Session_Id,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Printf("no user has been returned, check the email, %v\n", http.StatusBadRequest)
			return false, fmt.Errorf("user not found with ID: %d", Id)
		} else {
			fmt.Printf("error during querying has occurred, check the request, %v\n", http.StatusInternalServerError)
			return false, err
		}
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), 14)
	result, err := db.Exec(updateQuery,
		newUser.Name, newUser.Surname, newUser.Email, string(hashedPassword), newUser.Is_Admin, Id,
	) //defaultString doesn't work right, make sure to include everything in there
	if err != nil {
		fmt.Printf("error executing update statement %v\n", err)
		return false, err
	}
	rowsAffected, _ := result.RowsAffected()
	fmt.Printf("Rows affected: %v\n", rowsAffected)
	return true, nil
}

func DeleteUser(Id int64) (bool, error) {
	connected, err := Connect()
	if connected == 1 {
		fmt.Printf("Problem connecting to the db, status code: %v\n", connected)
		return false, nil
	}
	if err != nil {
		fmt.Printf("Error connection the db, error: %v\n", err)
		return false, err
	}
	deleteQuery := "DELETE FROM users WHERE id = ?"
	readQuery := "SELECT * FROM users WHERE id = ?"
	var existingU User
	if err = db.QueryRow(readQuery, Id).Scan(
		&existingU.Id, &existingU.Name, &existingU.Surname,
		&existingU.Email, &existingU.Password, &existingU.Is_Admin, &existingU.Session_Id,
	); err != nil {
		if err == sql.ErrNoRows {
			fmt.Printf("no user has been returned, check the email, %v\n", http.StatusBadRequest)
			return false, fmt.Errorf("user not found with ID: %d", Id)
		} else {
			fmt.Printf("error during querying has occurred, check the request, %v\n", http.StatusInternalServerError)
			return false, err
		}
	}
	_, err = db.Exec(deleteQuery, Id)
	if err != nil {
		fmt.Printf("there is an error executing, error: %v\n", err)
		return false, err
	}
	return true, nil
}

func LoginUser(loggedU Login) (bool, error) {
	connected, err := Connect()
	if connected == 1 {
		fmt.Printf("problem connecting to the db, status code %v", connected)
	}
	if err != nil {
		fmt.Printf("error connecting to the db, err: %v", err)
		return false, err
	}
	checkQuery := "SELECT * FROM users WHERE email = ?"
	var existingU User
	if err := db.QueryRow(checkQuery, loggedU.Email).Scan(
		&existingU.Id,
		&existingU.Name,
		&existingU.Surname,
		&existingU.Email,
		&existingU.Password,
		&existingU.Is_Admin,
		&existingU.Session_Id); err != nil {
		if err == sql.ErrNoRows {
			fmt.Printf("no user in the db by that email, error: %v", err)
			return false, err
		}
		fmt.Printf("there is an error querying the row")
		return false, err
	}
	err = bcrypt.CompareHashAndPassword([]byte(existingU.Password), []byte(loggedU.Password))
	if err != nil {
		fmt.Printf("wrong password, error: %v", err)
		return false, fmt.Errorf("wrong password, error: %v", err)
	}
	return true, nil
}
