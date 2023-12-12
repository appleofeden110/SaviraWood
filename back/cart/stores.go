package cart

import (
	"database/sql"
	"fmt"
	"github.com/dotenv-org/godotenvvault"
	"log"
	"os"
)

// creates global database variable
var db *sql.DB

// Connect connects to MySQL db
// returns : status code (int) and an error (error)
func Connect() (int, error) {
	err := godotenvvault.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	//.env file Environment Variables handling
	connString := fmt.Sprintf("%v:%v@(127.0.0.1:3306)/%v?parseTime=true", os.Getenv("DB_USERNAME"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_DATABASE"))
	db, err = sql.Open("mysql", connString)
	//verify that connection is alive
	err = db.Ping()
	//error handle
	if err != nil {
		log.Fatalf("There is a problem connecting to MySQL Database: %v", err)
		return 1, err
	}
	return 0, nil
}
