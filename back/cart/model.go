package cart

import (
	"database/sql"
	"fmt"
)

type Cart struct {
	ProdId    int64  `json:"prod_id"`
	Name      string `json:"name"`
	Width     int64  `json:"width"`
	Height    int64  `json:"height"`
	Weight    int64  `json:"weight"`
	Price     int64  `json:"price"`
	SessionId string `json:"session_id"`
}

func ReadCart(session_id string) ([]Cart, error) {
	connected, err := Connect()
	if connected == 1 {
		return nil, fmt.Errorf("problem connecting to the database\n")
	}
	if err != nil {
		fmt.Printf("Error connecting to the db, error: %v\n", err)
		return nil, err
	}

	defer db.Close()

	readQuery := "SELECT * FROM cart_items WHERE session_id = ?"
	rows, err := db.Query(readQuery, session_id)
	cart_prods := make([]Cart, 0)

	for rows.Next() {
		var p Cart
		err = rows.Scan(&p.ProdId, &p.Name, &p.Width, &p.Height, &p.Weight, &p.Price, &p.SessionId)
		cart_prods = append(cart_prods, p)
	}

	err = rows.Err()
	if err != nil {
		fmt.Printf("problem reading rows")
		return nil, err
	}
	return cart_prods, nil
}

func CreateCartProd(newCartProd Cart) (bool, error) {
	connected, err := Connect()
	if connected == 1 {
		return false, fmt.Errorf("problem connecting to the database")
	}
	if err != nil {
		fmt.Printf("error connecting to the database, error: %v", err)
		return false, err
	}
	defer db.Close()
	readQuery := "SELECT * FROM cart_items WHERE session_id = ? AND name = ?"
	writeQuery := "INSERT INTO cart_items (name, width, height, weight, price, session_id) VALUES (?, ?, ?, ?, ?, ?)"
	var p Cart

	if db.QueryRow(readQuery).Scan(
		&p.ProdId,
		&p.Name,
		&p.Width,
		&p.Height,
		&p.Weight,
		&p.Price,
		&p.SessionId); err != nil {
		if err != sql.ErrNoRows {
			return false, fmt.Errorf("Product is already added to the cart!, err: %v", err)
		}
		return false, fmt.Errorf("there is an error querying a row, %v", err)
	}
	_, err = db.Exec(writeQuery, newCartProd.Name, newCartProd.Width, newCartProd.Height, newCartProd.Weight, newCartProd.Price, newCartProd.SessionId)
	if err != nil {
		return false, fmt.Errorf("error executing INSERT query, error: %v", err)
	}

	return true, nil
}

func DeleteOneCartProduct(name string, session_id string) (bool, error) {
	connected, err := Connect()
	if connected == 1 {
		return false, fmt.Errorf("there is a problem connecting")
	}
	if err != nil {
		return false, fmt.Errorf("there is an ERROR connecting to the database, error: %v", err)
	}
	defer db.Close()

	readQuery := "SELECT * FROM cart_items WHERE name = ? AND session_id = ?"
	deleteQuery := "DELETE FROM cart_items WHERE name = ? AND session_id = ?"

	var p Cart
	if db.QueryRow(readQuery, name, session_id).Scan(
		&p.ProdId,
		&p.Name,
		&p.Width,
		&p.Height,
		&p.Weight,
		&p.Price,
		&p.SessionId); err != nil {
		if err == sql.ErrNoRows {
			return false, fmt.Errorf("Product is not in the cart!, err: %v", err)
		}
		return false, fmt.Errorf("there is an error querying a row, %v", err)
	}

	_, err = db.Exec(deleteQuery, name, session_id)
	if err != nil {
		return false, fmt.Errorf("there is an error executing the DELETE query, error: %v", err)
	}
	return true, nil
}
