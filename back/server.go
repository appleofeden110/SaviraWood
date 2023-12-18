package main

//only products dir, http and a few std libraries
import (
	"errors"
	"fmt"
	"github.com/appleofeden110/SaviraWood/cart"
	"github.com/appleofeden110/SaviraWood/products"
	"github.com/appleofeden110/SaviraWood/users"
	"io"
	"net/http"
)

const port = 3333

// endpoints, site execution (in other words, a Router)
func main() {

	// handling of controllers
	fmt.Printf("Site is running on http://localhost:%v\n", port)
	//root, method: GET
	http.HandleFunc("/", getRoot)

	//PRODUCTS

	//all products, method: GET
	http.HandleFunc("/products/read", products.GetProds)
	//one prod by id, method: GET
	http.HandleFunc("/products/read/", products.GetProd)
	//create a product, method: POST
	http.HandleFunc("/products/create", products.CreateProd)
	//update a product, method: PUT
	http.HandleFunc("/products/update", products.UpdateProd)
	//delete a product, method: DELETE
	http.HandleFunc("/products/delete/", products.DeleteProd)

	// USERS

	//get all users, method: GET
	http.HandleFunc("/users/read", users.GetUs)
	//get one user, method: GET
	http.HandleFunc("/users/read/", users.GetU)
	//create one user, method: POST
	http.HandleFunc("/users/create", users.CreateU)
	//update one user, using his id, method: POST
	http.HandleFunc("/users/update/", users.UpdateU)
	//delete one user, using his id, method: DELETE
	http.HandleFunc("/users/delete/", users.DeleteU)
	//login the user, using his email and password, method: POST
	http.HandleFunc("/users/login", users.LoginU)

	//CART

	//get all cart products determined by the session_id of the user, method: GET
	http.HandleFunc("/carts/read/", cart.GetCartProds)
	//create a product in the cart for single user, method: POST
	http.HandleFunc("/carts/create/", cart.CreateCartProduct)
	//delete one product from the cart for single user, method: DELETE
	http.HandleFunc("/carts/delete", cart.DeleteCartProd)
	//port init
	err := http.ListenAndServe(":3333", nil)
	//err handling for main
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		return
	}
}

// only server file,
// function is to introduce user to the site
func getRoot(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		fmt.Printf("got / request\n")
		_, err := io.WriteString(w, "this is my site!!!")
		if err != nil {
			return
		}
	}
}
