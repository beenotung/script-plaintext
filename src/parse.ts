import { readFileSync, writeFileSync } from "fs"

function parseText(text:string):string{
  text = text.replaceAll(/\r.*?\r\r/g,'')
  text = text.replaceAll(/\x1B\[[0-9;]*?m(.*?)\x1B\[[0-9;]*?m/g, (string,...args)=>{
    return args[0]
  })
  for(;;){
    let index = text.indexOf('\u0008')
    if(index==-1) break
    text = text.slice(0,index-1) + text.slice(index+1)
  }

  return text
}

function test(){
  let input = readFileSync('typescript').toString()
  let expected = readFileSync('plain').toString()
  let actual = parseText(input)
  console.assert(actual==expected,'should match')
  writeFileSync('actual', actual)

  console.log('=================== input =======================')
  console.log(input)
  console.log('=================================================')
  console.log('=================== actual =======================')
  console.log(actual)
  console.log('=================================================')
  console.log('=================== expected =======================')
  console.log(expected)
  console.log('=================================================')
}

test()
