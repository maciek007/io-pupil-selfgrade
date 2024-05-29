# Setup projektu 

## Najłatwiejsza opcja

Uruchamiamy obie aplikacje jednocześnie za pomocą `compose.yaml`. 

Będąc w głównym folderze wpisujemy `docker-compose up --build` co spowoduje zbudowanie obu obrazu i uruchomienie ich jako kontenerów.

## Frontend 
- Wersja bez dockera:
    1. Należy wejść do katalogu `frontend`
    2. Wpisać polecenie `npm install`
    3. Po pobraniu dependencies przez npm wpisujemy `yarn run dev` aby odpalić projekt. W konsoli powinny zostać podane sockety na których działa strona. 
- Wersja z dockerem:
  1. Przechodzimy do folderu `frontend`
  2. Tworzymy obraz za pomocą `docker build -t react-docker .`
      - `-t <nazwa_obrazu>` - tworzy obraz dockera o zadanej nazwie
      - `.` - oznacza aktualny folder
  4. Uruchamiamy stworzony obraz za pomocą `docker run -p 3000:3000 react-docker`
      - `-p` - odpowiada za mapowanie portów z dockera na nasz
      - `react-docker` - to nazwa wcześniej utworzonego obrazu

## Backend
- Wersja bez dockera:
    1. Uruchamiamy przez zwykłe IDE dla javy
- Wersja z dockerem:
  1. Przechodzimy do folderu `backend`
  2. Tworzymy obraz za pomocą `docker build -t spring-docker .`
      - `-t <nazwa_obrazu>` - tworzy obraz dockera o zadanej nazwie
      - `.` - oznacza aktualny folder
  4. Uruchamiamy stworzony obraz za pomocą `docker run -p 8000:8000 spring-docker`
      - `-p` - odpowiada za mapowanie portów z dockera na nasz
      - `spring-docker` - to nazwa wcześniej utworzonego obrazu
