import React from "react"

const ExpandCard=(props)=>{

    var rating 
    if (props.rating>4){
        rating="good"
    }
    else if(props.rating<=4 && props.raing>3){
        rating="above average"
    }
    else if(props.rating<=3 && props.raing>2){
        rating="average"
    }
    else if(props.rating<=2 && props.raing>1){
        rating="bad"
    }
    else{
        rating="very bad"
    }
    const gridwidth=(props.id%4==0)?"right-[295px]":""
    console.log(gridwidth)
    return (
        <div onMouseLeave={props.toggle} className={`${gridwidth} rounded-lg relative w-[560.25px] shadow-[0px_4px_14px_rgba(0,0,0,0.25)] z-10 bg-white`}>
            <p onClick={()=>{props.updateWishlist(props.id,props.elective)}} className="absolute -top-4 right-2 cursor-pointer text-center bg-primary rounded-[50%] w-[33px] h-[33px] text-[19px] border-2 border-black font-semibold mt-[20px]">{(props.wishlist?"-":"+")}</p>
            <div className="w-[100%] h-[87px] bg-secondary absolute -z-10"></div>
            <div className="flex w-[100%] justify-between  ml-[23px] mt-[33px]">
                <img className="inline w-[248px] h-[151px]" src={props.image}/>
                <div className="mx-[26px]">
                    <p className="font-bold text-[20px]">{props.name}</p>
                    <p className={`relative text-[9px] font-semibold `}>{`by ${props.faculty}`}</p>
                    <p className=" font-normal text-[12px] mt-[20px]">{props.description}</p>
                </div>
            </div>
            <div className="flex justify-evenly my-5">
                <p className="text-[11px] font-medium">{`lecture hrs:${props.duration}`}</p>
                <p className="text-[11px] font-medium">{`venue:${props.venue}`}</p>
                <p className="text-[11px] font-medium">{`rating:${rating}`}</p>
                <p className="text-[11px] font-medium">{`${props.remainingPlaces} places left`}</p>
            </div>
            
        </div>
    )
}

export default ExpandCard

