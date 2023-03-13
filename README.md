

URL = localhost:3000/api/v1/


sort 
URL/products?sort=any property
URL/products?sort=-name // from a to z
URL/products?sort=-name,-price // from longer to lower  

select 
URL/products?fields=field,field 
URL/products?fields=name
URL/products?fields=name,rating

search 
URL/products?featured=boolean&company=companyName&name=name (can search for full name or part of name)


pagination 
// 23 items if the limit 7 it divide to 4 pages 7 7 7 2
URL/products?limit=7&page=1 // 7 items
URL/products?limit=7&page=2 // 7 items
URL/products?limit=7&page=3 // 7 items
URL/products?limit=7&page=4 // 2 items


// numericFields 
URL/products?numericFilters=price>30,rating>=4
