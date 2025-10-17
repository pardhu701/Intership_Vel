export default  function New({name='Pardha Saradhi',dec,link,custom}){

  

    return (
        <>

        <div style={custom?.container}>
            <h1 style={custom?.name}>{name}</h1>
            <p style={custom?.description}>
                {dec}
                <br/>
                <a style={custom?.link} href={link}> Press_Button </a>
            </p>
            


        </div>

        </>
    )

}
