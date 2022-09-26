const file=()=>{
    const date=new Date();
    let time = date.toLocaleTimeString();
   // console.log(time);
    time = time.replace('AM','').trim();
    time = time.replace('PM','').trim();
    time=time.replace(/:/g,'').trim();
    let filename =time+'_'+Math.floor(Math.random() * 1000000);
    return filename;
}
module.exports=file;