import './Form.css';

function Form({ inputs, button }) {
  return (
    <form className='form' noValidate={ true }>
      {/* {inputs.map((input) => {
        return (
          <div>
            <p className='form__input_title'>{ input }</p>
            <input className='form__input' placeholder=''></input>
          </div>
        );
      })} */}
      {inputs.map((input) => (
        <div>
          <p className='form__input_title'>{ input }</p>
          <input className='form__input' placeholder=''></input>
        </div>
      ))}
      <button className='form__submit-button'>{ button }</button>
    </form>
  );
}

export default Form;
