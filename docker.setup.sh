name="postgres"
password="postgres"

docker run -d --name $name -e POSTGRES_PASSWORD=$password -p 5432:5432 postgres:11.5