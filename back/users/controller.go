package users

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
)

// GetProds inits the value from database via model
func GetUs(w http.ResponseWriter, _ *http.Request) {
	users, err := GetUsers()
	//json parser
	err = json.NewEncoder(w).Encode(users)
	if err != nil {
		w.WriteHeader(500)
		return
	}
}

func GetU(w http.ResponseWriter, r *http.Request) {
	url := r.URL.Path
	parts := strings.Trim(url, "/")
	segments := strings.Split(parts, "/")

	if len(segments) != 3 {
		fmt.Print("wrong request address")
		return
	}
	id, err := strconv.ParseInt(segments[2], 10, 64)
	user, err := GetUser(id)
	w.WriteHeader(http.StatusAccepted)
	err = json.NewEncoder(w).Encode(user)
	if err != nil {
		w.WriteHeader(500)
		return
	}
}

func CreateU(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var u User
		body, err := io.ReadAll(r.Body)
		fmt.Println("Raw request body:", string(body))
		if err != nil {
			fmt.Printf("error reading body: %v", http.StatusBadRequest)
			return
		}
		err = json.Unmarshal(body, &u)
		if err != nil {
			fmt.Printf("error decoding the body: %v", err)
			return
		}
		isCreated, err := CreateUser(u)
		if !isCreated {
			fmt.Printf("Unsuccessful creating of a user")
			return
		}
		if err != nil {
			fmt.Printf("error creating the user")
		}
		w.WriteHeader(http.StatusCreated)
		_, _ = fmt.Fprint(w, "User has been created")
	}
}

func UpdateU(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var newU User

		url := r.URL.Path

		parts := strings.Trim(url, "/")
		arrayOfUrl := strings.Split(parts, "/")

		if len(arrayOfUrl) != 3 {
			http.Error(w, "wrong url", http.StatusBadRequest)
			return
		}
		id, err := strconv.ParseInt(arrayOfUrl[2], 10, 64)
		body, err := io.ReadAll(r.Body)
		if err != nil {
			fmt.Printf("error reading body: %v", http.StatusBadRequest)
			return
		}
		err = json.Unmarshal(body, &newU)
		if err != nil {
			fmt.Printf("error decoding the body: %v", err)
			return
		}

		isUpdated, err := UpdateUser(newU, id)

		if !isUpdated {
			http.Error(w, "there is problem updating", http.StatusInternalServerError)
			return
		}
		if err != nil {
			http.Error(w, "there is an error updating", http.StatusBadRequest)
			return
		}

		w.WriteHeader(http.StatusAccepted)
		fmt.Printf("User has been updated")
	}
}

func DeleteU(w http.ResponseWriter, r *http.Request) {
	url := r.URL.Path
	parts := strings.Trim(url, "/")
	segments := strings.Split(parts, "/")
	if len(segments) != 3 {
		http.Error(w, "wrong url", http.StatusBadRequest)
		return
	}
	id, err := strconv.ParseInt(segments[2], 10, 64) // id goingt ot id+6 essentially

	if err != nil {
		http.Error(w, "there is an error converting", http.StatusInternalServerError)
		return
	}
	isDeleted, err := DeleteUser(id)
	if !isDeleted {
		http.Error(w, "there is problem deleting", http.StatusInternalServerError)
		return
	}
	if err != nil {
		http.Error(w, "there is an error deleting", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
	fmt.Printf("User has been deleted")
}

func LoginU(w http.ResponseWriter, r *http.Request) {
	var newLog Login //just email and password
	body, err := io.ReadAll(r.Body)
	fmt.Println("Raw request body:", string(body))
	if err != nil {
		fmt.Printf("error reading body: %v", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(body, &newLog)
	if err != nil {
		fmt.Printf("error decoding the body: %v", err)
		return
	}
	isLogged, err := LoginUser(newLog)
	if !isLogged {
		fmt.Printf("Problem logging in the user, %v", isLogged)
		return
	}
	if err != nil {
		fmt.Printf("error logging in the user, error: %v", err)
		return
	}
	w.WriteHeader(http.StatusAccepted)
	fmt.Printf("User has been logged in\n")
}
