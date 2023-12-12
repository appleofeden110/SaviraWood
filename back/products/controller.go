package products

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

// GetProds inits the value from database via model
func GetProds(w http.ResponseWriter, _ *http.Request) {
	products, err := GetProducts()
	//json parser
	err = json.NewEncoder(w).Encode(products)
	if err != nil {
		w.WriteHeader(500)
		return
	}
}
func GetProd(w http.ResponseWriter, r *http.Request) {

	urlPath := r.URL.Path
	//handles the id param (not shown in actual endpoint goes after products/)
	parts := strings.Trim(urlPath, "/")  // /products/{id}
	segment := strings.Split(parts, "/") // ["products", "{id}"]

	if len(segment) != 3 {
		w.WriteHeader(400)
		return
	}

	id, err := strconv.ParseInt(segment[2], 10, 64)
	product, found, err := GetProduct(id)
	//check if the product is found by id
	if !found || err != nil {
		if err != nil {
		} else {
			http.Error(w, "product not found", 404)
		}
		return
	}

	err = json.NewEncoder(w).Encode(product)
	if err != nil {
		return
	}
	fmt.Printf("got /product/id request\n")
}

func CreateProd(w http.ResponseWriter, r *http.Request) {
	var p Product

	err := json.NewDecoder(r.Body).Decode(&p)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	isCreated, createErr := CreateProduct(p)
	if createErr != nil {
		http.Error(w, createErr.Error(), http.StatusInternalServerError)
		fmt.Printf("Error creating product: %v\n", createErr)
		return
	}

	if !isCreated {
		http.Error(w, "Product already exists", http.StatusConflict)
		fmt.Println("Product already exists")
		return
	}

	w.WriteHeader(http.StatusCreated)
	_, _ = fmt.Fprint(w, "Product has been created")
}

func UpdateProd(w http.ResponseWriter, r *http.Request) {
	var up Product

	err := json.NewDecoder(r.Body).Decode(&up)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	isUpdated, updateErr := UpdateProduct(up)
	if updateErr != nil {
		http.Error(w, updateErr.Error(), http.StatusInternalServerError)
		fmt.Printf("Error updating product: %v\n", updateErr)
		return
	}

	if !isUpdated {
		http.Error(w, "Error while updating the product", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusAccepted)
	_, _ = fmt.Fprint(w, "Product has been updated")
}
func DeleteProd(w http.ResponseWriter, r *http.Request) {
	url := r.URL.Path

	parts := strings.Trim(url, "/")
	segments := strings.Split(parts, "/")

	if len(segments) != 3 {
		return
	}

	name := segments[2]

	isDeleted, err := DeleteProduct(name)

	if !isDeleted {
		_ = fmt.Errorf("deletion was unsuccessful, returned %v", isDeleted)
		w.WriteHeader(http.StatusBadRequest)
	}
	if err != nil {
		return
	}

	w.WriteHeader(http.StatusAccepted)
	fmt.Printf("Product has been Deleted")
}
