# IT Storm
Company website with blog functionality

Stack: Angular, SCSS, Typescript, Material UI, MongoDB

The following functionality is implemented: 
1) Authorization/ authentication; 
2) Blog (filtering) 
3) Detailed article page (with the ability to comment on articles by authorized users); 

## Get start

### Test userData
```sh
login: test1@mai.ru
password: 12345678Qq
```
### Backend launch

```sh
cd backend
npm install -g migrate-mongo
migrate-mongo up
npm run start
```
### Frontend launch
```sh
cd frontend
npm install
ng serve
```
## Screenshots
1. Main page
![screencapture-localhost-4200-2023-05-16-15_11_36](https://github.com/dmitiry7444/blog/assets/110829675/4d158038-7689-4a32-910b-f580f2b0986d)

2. Blog
![screencapture-localhost-4200-blog-2023-05-16-15_11_18](https://github.com/dmitiry7444/blog/assets/110829675/07f75c46-4aa0-4650-97b9-2db979a70a04)

3.Detail article page
![screencapture-localhost-4200-blog-6-saitov-dlya-povisheniya-produktivnosti-2023-05-16-15_12_42](https://github.com/dmitiry7444/blog/assets/110829675/51bf62db-2e02-466b-a99b-f9023d45854a)
