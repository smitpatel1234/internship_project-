import {useField} from 'formik'
export default function Inputbox({label,...props}) {
  const [field, meta] = useField(props);
  return (
    <div className='inputcom'> 
          <label htmlFor={props.name}>{label}</label>
          <input {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
    </div>
  )
}
