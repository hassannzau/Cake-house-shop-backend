import Layout from '@/assets/components/layout';
import style from "./contact.module.scss"
import Map from './sections/map/map';
import StoreCard from './sections/storeCard/storeCard.tsx';
import FormContact from './sections/formContact/formContact.tsx';
function Contact() {
  return (
    <Layout>
    <div className={style.contact}>
      <h1>
      Contact Us
      </h1>
      <Map/>
      <StoreCard
          title="Store in Warsaw"
          addressLine1="Rynek Starego Miasta 1"
          addressLine2="00-272 Warszawa, Poland"
          email="hello@cakehouse.com"
          phone="+1 246-345-0695"
        />
        <FormContact/>
    </div>
    </Layout>
  )
}

export default Contact
