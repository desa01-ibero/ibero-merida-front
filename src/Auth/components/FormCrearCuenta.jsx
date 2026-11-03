
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FiArrowUpRight } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useApiData } from '../../hooks/useApiData'

const validationSchema = Yup.object({
  nombreCompleto: Yup.string().trim().required('El nombre es requerido'),
  nombreColectivo: Yup.string().trim().required('El nombre del colectivo es requerido'),
  link: Yup.string().trim().url('Ingresa un link válido').required('El link es requerido'),
  correo: Yup.string().trim().email('Ingresa un correo válido').required('El correo es requerido'),
  confirmarCorreo: Yup.string()
    .trim()
    .oneOf([Yup.ref('correo')], 'Los correos no coinciden')
    .required('Confirma tu correo'),
  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Debe incluir al menos 1 mayúscula')
    .matches(/[0-9]/, 'Debe incluir al menos 1 número')
    .matches(/[^A-Za-z0-9]/, 'Debe incluir al menos 1 caracter especial')
    .required('La contraseña es requerida'),
  aceptaPrivacidad: Yup.boolean().oneOf([true], 'Debes aceptar el aviso de privacidad'),
})

const campos = [
  { name: 'nombreCompleto', label: 'Nombre de quien registra', placeholder: 'Nombre y apellidos' },
  { name: 'nombreColectivo', label: 'Nombre del colectivo', placeholder: 'Ej. Estudio arquitectónico' },
  { name: 'link', label: 'Link del colectivo / link de LinkedIn', placeholder: 'Copia y pega', type: 'url' },
  { name: 'correo', label: 'Correo electrónico', placeholder: 'Ej. nombre@despacho.com', type: 'email' },
  { name: 'confirmarCorreo', label: 'Confirmación de correo electrónico', placeholder: 'Ej. nombre@despacho.com', type: 'email' },
  { name: 'password', label: 'Contraseña', placeholder: 'Mínimo 8 caracteres 1 especial, 1 mayúscula y 1 número', type: 'password' },
]

export const FormCrearCuenta = ({ onSubmit }) => {
const dispatch = useDispatch();
const { sendData } = useApiData();

  const formik = useFormik({
    initialValues: {
      nombreCompleto: '',
      nombreColectivo: '',
      link: '',
      correo: '',
      confirmarCorreo: '',
      password: '',
      aceptaPrivacidad: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
      
      handleSubmit(values);
    },
  })

  const hasError = (name) => formik.touched[name] && Boolean(formik.errors[name])

  const handleSubmit = async (values) => {
    console.log(values);
    
    const dataPost = {
            nombreCompleto: values.nombreCompleto,
            nombreColectivo: values.nombreColectivo,
            link: values.link,
            correo: values.correo,
            password: values.password
        } 

    const response = await sendData(
      `Auth/signup`,
      "post",
      dataPost,
      {},
      "Registrando usuario...",
      {
        title: "¡Éxito!",
        message: "Tu cuenta se ha creado correctamente.",
      },
    );


  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      {campos.map(({ name, label, placeholder, type = 'text' }) => (
        <div className="mb-3" key={name}>
          <label htmlFor={name} className="form-label registro-label">{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className={`form-control registro-input ${hasError(name) ? 'is-invalid' : ''}`}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {hasError(name) && <div className="invalid-feedback">{formik.errors[name]}</div>}
        </div>
      ))}

      <div className="form-check registro-check mb-3">
        <input
          id="aceptaPrivacidad"
          name="aceptaPrivacidad"
          type="checkbox"
          className={`form-check-input ${hasError('aceptaPrivacidad') ? 'is-invalid' : ''}`}
          checked={formik.values.aceptaPrivacidad}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="aceptaPrivacidad" className="form-check-label">
          Acepto el aviso de privacidad.
        </label>
        {hasError('aceptaPrivacidad') && (
          <div className="invalid-feedback">{formik.errors.aceptaPrivacidad}</div>
        )}
      </div>

      <p className="registro-nota mb-3">
        La información de esta sección será visible únicamente para el equipo
        coordinador y nunca para el jurado
      </p>

      <button type="submit" className="btn btn-registro-submit w-100" >
        Crear cuenta y continuar <FiArrowUpRight className="ms-3" />
      </button>
    </form>
  )
}

export default FormCrearCuenta
