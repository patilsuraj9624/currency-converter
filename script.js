const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

  const dropdown = document.querySelectorAll(".dropdown select")
  const btn =document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg =document.querySelector(".msg")

  for(let select of dropdown)
  {
    for(code in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerHTML =code;
        newOption.value =code;
        if(select.name ==="from" && code==="USD")
        {
            newOption.selected="selected";
        }else if(select.name === "to" && code ==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
  }

  const updateFlag =(element)=>{
    let code = element.value
    let countrycode = countryList[code]
    let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
  }

  btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === ""||amtval < 1)
    {
        amtval=1;
        amount.value="1";
    }
    
   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
   let response = await fetch(URL)
   let data = await response.json()
   console.log(data)
   let rate =data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
   console.log(rate)
   let finalamount = amtval * rate;
   msg.innerText =`${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`
  
  })