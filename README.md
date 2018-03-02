[![https://github.com/tgwalker93/StockLeague/blob/master/public/assets/img/carousel1.gif](https://github.com/tgwalker93/StockLeague/blob/master/public/assets/img/carousel1.gif)](https://github.com/tgwalker93/StockLeague/blob/master/public/assets/img/carousel1.gif)
# Stock League

This is a simple stock simulator application where you can compete with friends based on portfolio growth. Currently, all you have to do is choose three stocks and check in everyday to see how your portfolio grows. When you register, you pick three stocks and once you complete registration you won't be able to change unless you register again under a different username. When picking your stock, it will give you the last closing price. Also, if you choose let than 3 stocks, then there will be default stocks for the remaining amount. Once you are registered, your points will begin accumulating immediately, accounting for points for that previous day. If you choose to join a league, other players that are in your league will be able to compare points to compete for the highest growth!



## Getting Started

You can refer to the link here to see the application deployed on Heroku: https://stockleague.herokuapp.com/

If you want to download this repository and run locally, you will need a MySQL local database connection, and you can change the config.json file to the correct login. 

## Screenshots

### Register Page
![/public/assets/img/Screenshots/Register.PNG](/public/assets/img/Screenshots/Register.PNG)


### Profile Page
![/public/assets/img/Screenshots/Profile.PNG](/public/assets/img/Screenshots/Profile.PNG)

### Stock Analysis Page
![/public/assets/img/Screenshots/Analysis.PNG](/public/assets/img/Screenshots/Analysis.PNG)


### League Page
![/public/assets/img/Screenshots/League.PNG](/public/assets/img/Screenshots/League.PNG)




### Prerequisites

In order to start this program, you will need the following software downloaded: 
* [MySql](https://dev.mysql.com/doc/)
* [Node.js](https://nodejs.org/en/docs/)


### Installing

In order to install node packages, simply open the terminal at the root and type:

```
npm install
```




### Running Locally

Open terminal at root and type:
```
node server
```
If your application is listening locally, it will be listening on port 3000. You can then view the application locally in the browser from this URL:
```
http://localhost:3000/
```



## Built With

* [MySql](https://dev.mysql.com/doc/) - Database
* [Sequelize](http://docs.sequelizejs.com/) - Promise-based ORM for Node.js
* [Node.js](https://nodejs.org/en/docs/) - Back-End Framework
* [Express.js](https://expressjs.com/) - Routing and middleware web framework
* [Passport.js](http://www.passportjs.org/docs) - Authentication middleware for Node
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Library for hashing passwords
* [Quandl](https://docs.quandl.com/) - API for stock data
* [Robinhood](https://github.com/sanko/Robinhood) - API for stock data
* [Bootstrap](https://getbootstrap.com/docs/3.3/getting-started/) - Front-End Framework


## Authors

* **Tyler Walker** - *Back-End Developer/Project Manager* - [tgwalker93](https://github.com/tgwalker93)
* **Tammy Le** - *Front-End Developer* - [letam245](https://github.com/letam245)
* **Prathibha Chunchu** - *Front-End Developer* - [chunchuprati](https://github.com/chunchuprati)
* **Christopher Jalallian** - *QA* - [chrisjal](https://github.com/chrisjal)


---


[![HitCount](http://hits.dwyl.io/tgwalker93/StockLeague.svg)](http://hits.dwyl.io/tgwalker93/StockLeague)