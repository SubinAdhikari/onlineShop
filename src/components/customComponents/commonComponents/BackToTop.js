import React,{useState} from 'react';

const BackToTop = () =>{

    const [state,setState]=useState(false);

    const backToTopUrl = () =>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        // mybutton.style.display = "block";
        setState(true);
      } else {
        // mybutton.style.display = "none";
        setState(false)
      }
    }

    return(
        <>
        {
            state
            ?
            <div className="backToTopMainDiv d-flex justify-content-center align-items-center" onClick={backToTopUrl}> 
            <i className="fa fa-angle-up"></i>
            </div>
            :
            ('')
        }
        </>
    )
}
export default BackToTop;