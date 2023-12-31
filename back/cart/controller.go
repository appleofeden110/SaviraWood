package cart

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

func GetCartProds(w http.ResponseWriter, r *http.Request) {
	urlPath := r.URL.Path
	parts := strings.Trim(urlPath, "/")
	segment := strings.Split(parts, "/")

	if len(segment) != 3 {
		w.WriteHeader(400)
		return
	}

	cartProds, err := ReadCart(segment[2])
	if err != nil {
		w.WriteHeader(500)
		return
	}

	// Set the Content-Type before writing the response body
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	err = json.NewEncoder(w).Encode(cartProds)
	if err != nil {
		// In case of an encoding error, it's better to return a 500 status
		w.WriteHeader(500)
		return
	}
}
func CreateCartProduct(w http.ResponseWriter, r *http.Request) {
	var CartProd Cart
	body, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("error reading body: %v", http.StatusBadRequest)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	urlPath := r.URL.Path
	parts := strings.Trim(urlPath, "/")
	segment := strings.Split(parts, "/")

	if len(segment) != 3 {
		w.WriteHeader(400)
		return
	}
	err = json.Unmarshal(body, &CartProd)
	CartProd.SessionId = segment[2]
	fmt.Println(CartProd)
	if err != nil {
		fmt.Printf("error decoding the body: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	isCreated, err := CreateCartProd(CartProd)
	if !isCreated {
		fmt.Printf("problem created the cart product")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if err != nil {
		fmt.Printf("error creating the cart product")
		w.WriteHeader(http.StatusBadRequest)
		return

	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Good Stuff!"))
	fmt.Printf("Cart product created!!!")
}

func DeleteCartProd(w http.ResponseWriter, r *http.Request) {
	var CartProd Cart
	body, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("error reading body: %v", http.StatusBadRequest)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(body, &CartProd)
	if err != nil {
		fmt.Printf("error unmarshalling, error: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	isDeleted, err := DeleteOneCartProduct(CartProd.Name, CartProd.SessionId)

	if !isDeleted {
		fmt.Printf("problem deleting the product from cart")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if err != nil {
		fmt.Printf("error deleting the product from the cart, error: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Good Stuff!"))
	fmt.Printf("Cart product deleted!!!")
}
