import React from "react";
import WishCourse from "./wishCourse.jsx";
const Wishlist = (props) => {
  var remainingCourses = props.wishList1.length + props.wishList2.length;
  var wishCrs1 = props.wishList1.map((obj,id) => {
    if (obj) {
      remainingCourses--;
      return (
        <WishCourse
          elective={`P${id+1}`}
          id={obj.id}
          addorRemoveToWishList={props.addorRemoveToWishList}
          key={obj.id}
          name={obj.name}
          credit={obj.credit}
        />
      );
    } else {
      return <></>;
    }
  });
  var wishCrs2 = props.wishList2.map((obj,id) => {
    if (obj) {
      remainingCourses--;
      return (
        <WishCourse
          elective={`F${id+1}`}
          id={obj.id}
          addorRemoveToWishList={props.addorRemoveToWishList}
          key={obj.id}
          name={obj.name}
          credit={obj.credit}
        />
      );
    } else {
      return <></>;
    }
  });

  return (
    <div className="fixed top-[62px] right-0 h-screen w-[300px] bg-secondary">
      <p className="inline-block mt-[31px] ml-[28px] py-[6px] px-[8px] border-[1px] border-black">
        Wishlist
      </p>
      <p className="right-4 top-[40px] inline-block absolute text-[12px] font-semibold">{`Remaining Courses : ${remainingCourses}`}</p>
      <div className="relative top-[70px]">
        {wishCrs1}
        {wishCrs2}
        <p onClick={props.submit} className="cursor-pointer mt-[40px] inline-block mx-[70px] bg-primary shadow-sm py-[5px] px-[40px] rounded-[25px]">
          Enroll Now
        </p>
      </div>
    </div>
  );
};

export default Wishlist;
