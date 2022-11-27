import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidty, setFormsInputValidity] = useState({});

  const nameInputRef = useRef();
  const postalCodeInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormsInputValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid &&
      enteredStreetIsValid;
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalCode,
      street: enteredStreet,
    });
  };

  const nameClasses = ` ${classes.control} ${
    !formInputsValidty.name ? classes.invalid : ""
  }`;
  const cityClasses = ` ${classes.control} ${
    !formInputsValidty.city ? classes.invalid : ""
  }`;
  const streetClasses = ` ${classes.control} ${
    !formInputsValidty.street ? classes.invalid : ""
  }`;
  const postalCodeClasses = ` ${classes.control} ${
    !formInputsValidty.postalCode ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidty.name && <p>Please enter valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidty.street && <p>Please enter valid street.</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidty.postalCode && (
          <p>Please enter valid postal code(more than 5 chars).</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidty.city && <p>Please enter valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
