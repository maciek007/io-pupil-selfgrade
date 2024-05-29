# Setup projektu 

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
