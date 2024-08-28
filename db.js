import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';



const  db = await sqlite.open({
    filename:  './data_plan.db',
    driver:  sqlite3.Database
});

await db.migrate();

export async function getprice_plan() {
const price_plan = await db.all('select * from price_plan')
return price_plan
} b