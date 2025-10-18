import Children from "./Children";

export default  function Parent(){

    return(
        <>
        <h1>Hi Parent</h1>
        <Children>
            <h1>Hi Children from Parent </h1>
        </Children>
        </>
    );

}
