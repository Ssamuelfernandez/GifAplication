import { useState } from "react"


export const AddCategory = ({ onNewCategory }) => {

    const [ inputValue, setInputValue ] = useState('');

    const onInputChange = ( event ) => {
        setInputValue( event.target.value );
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if ( inputValue.trim().length <= 1) return;

        const formattedInputValue = toTitleCase(inputValue.trim());
    onNewCategory(formattedInputValue);
    setInputValue("");
    }

    // Función para convertir una cadena en Title Case
  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
   
    <form onSubmit={ onSubmit }>
       <input 
    type="text" 
    placeholder="Buscar gifs"
    value={ inputValue }
    onChange={ onInputChange }
     /> 
    </form>
 
    
  )
}

