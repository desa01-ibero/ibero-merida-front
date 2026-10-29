import { PiePagina } from "../components/PiePagina"
import { AcercaDeIntersuj } from "../components/PublicBeforeGamesStart/AcercaDeIntersuj"
import IntersujHomeBefore from "../components/PublicBeforeGamesStart/IntersujHomeBefore"
import Proximamente from "../components/PublicBeforeGamesStart/Proximamente"


const PublicScreenBeforeGamesStart = ({onFinalizado, fechaEvento, data
}) => {
  return (
    <div>
        <IntersujHomeBefore onFinalizado={onFinalizado}/>
        <AcercaDeIntersuj data={data}/>
        <Proximamente />
        <PiePagina isHomeBefore={true} data={data}/>
    </div>
  )
}

export default PublicScreenBeforeGamesStart
