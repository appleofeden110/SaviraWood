package products

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

type Product struct {
	Id     int     `json:"id"`
	Name   string  `json:"name"`
	Width  float64 `json:"width"`
	Height float64 `json:"height"`
	Weight float64 `json:"weight"`
	Price  float64 `json:"price"`
}

// GetProducts Gets all product from the database
// Returns: Slice of Product structs and a possible error
func GetProducts() ([]Product, error) {
	connected, err := Connect()
	rows, err := db.Query("SELECT * FROM woodenpictures")
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			return
		}
	}(rows)

	products := make([]Product, 0)
	for rows.Next() {
		var p Product
		err = rows.Scan(&p.Id, &p.Name, &p.Width, &p.Height, &p.Weight, &p.Price)
		products = append(products, p)
	}
	err = rows.Err()
	if connected == 1 || err != nil {
		return nil, err
	}
	return products, nil
}

// GetProduct gets product via id
// Returns Product struct, value true or false if found or not (bool) and possible error
func GetProduct(id int64) (Product, bool, error) {
	connected, err := Connect()
	rows, err := db.Query("SELECT * FROM woodenpictures WHERE id = ?", id)

	defer func(rows *sql.Rows) {
		err = rows.Close()
		if err != nil {
			return
		}
	}(rows)
	var product Product
	found := false
	for rows.Next() {
		var p Product
		err = rows.Scan(&p.Id, &p.Name, &p.Width, &p.Height, &p.Weight, &p.Price)
		product = p
		found = true
	}
	err = rows.Err()
	if connected == 1 || err != nil {
		return Product{}, false, err
	}

	if found == false {
		return Product{}, false, nil
	}
	return product, true, nil
}

func CreateProduct(prod Product) (bool, error) {
	connected, err := Connect()
	if err != nil {
		return false, fmt.Errorf("failed to connect to the database: %v", err)
	}

	defer func() {
		if err := db.Close(); err != nil {
			fmt.Printf("error closing DB connection: %v\n", err)
		}
	}()

	query := "INSERT INTO woodenpictures (name, width, height, weight, price) VALUES (?, ?, ?, ?, ?)"

	rows, err := db.Query(query, prod.Name, prod.Width, prod.Height, prod.Weight, prod.Price)
	if err != nil {
		return false, fmt.Errorf("failed to execute query: %v", err)
	}

	defer func(rows *sql.Rows) {
		err = rows.Close()
		if err != nil {
			return
		}
	}(rows)

	if err := rows.Err(); err != nil {
		return false, fmt.Errorf("error encountered while iterating through rows: %v", err)
	}

	if connected == 1 || err != nil {
		return false, fmt.Errorf("database connection lost or other error occurred")
	}

	return true, nil // Product created successfully
}

func UpdateProduct(upProd Product) (bool, error) {
	//connecting to the db
	connected, err := Connect()
	if err != nil {
		return false, err
	}
	defer func() {
		if err := db.Close(); err != nil {
			return
		}
	}()
	//queries
	updateQuery := "UPDATE woodenpictures SET name = ?, width = ?, height = ?, weight = ?, price = ? WHERE name = ?"
	readQuery := "SELECT * FROM woodenpictures where name = ?"
	//read query, returns full product
	rows, err := db.Query(readQuery, upProd.Name)
	if err != nil {
		return false, err
	}
	//checking if the product exists, and then asigning it to the existingProd struct (if exists)
	var existingProd Product
	exists := false
	for rows.Next() {
		var p Product
		err = rows.Scan(&p.Id, &p.Name, &p.Width, &p.Height, &p.Weight, &p.Price)
		existingProd = p
		if err != nil {
			return false, err
		}
		exists = true
	}
	if exists {
		_, err = db.Query(updateQuery,
			defaultString(existingProd.Name, upProd.Name),
			defaultFloat(existingProd.Width, upProd.Width),
			defaultFloat(existingProd.Height, upProd.Height),
			defaultFloat(existingProd.Weight, upProd.Weight),
			defaultFloat(existingProd.Price, upProd.Price),
			upProd.Name)
		if err != nil {
			return false, fmt.Errorf("failed to execute query: %v", err)
		}
	}
	if err := rows.Err(); err != nil {
		return false, fmt.Errorf("error encountered while iterating through rows: %v", err)
	}
	if connected == 1 || err != nil {
		return false, fmt.Errorf("database connection lost or other error occurred")
	}
	return true, nil
}

func DeleteProduct(name string) (bool, error) {
	//connecting to the db and then closing when done
	connected, err := Connect()
	if err != nil {
		return false, err
	}
	defer func() {
		if err := db.Close(); err != nil {
			return
		}
	}()
	//queries
	deleteQuery := "DELETE FROM woodenpictures WHERE name = ?"
	readQuery := "SELECT * FROM woodenpictures where name = ?"
	//readQuery
	rows, err := db.Query(readQuery, name)
	if err != nil {
		return false, err
	}
	exists := false
	if rows.Next() {
		var p Product
		err = rows.Scan(&p.Id, &p.Name, &p.Width, &p.Height, &p.Weight, &p.Price)
		if err != nil {
			return false, err
		}
		exists = true
	}

	if exists {
		_, err = db.Exec(deleteQuery, name)
		if err != nil {
			return false, fmt.Errorf("failed to execute query: %v", err)
		}
	}
	if err := rows.Err(); err != nil {
		return false, fmt.Errorf("error encountered while iterating through rows: %v", err)
	}
	if connected == 1 || err != nil {
		return false, fmt.Errorf("database connection lost or other error occurred")
	}
	return true, nil
}
