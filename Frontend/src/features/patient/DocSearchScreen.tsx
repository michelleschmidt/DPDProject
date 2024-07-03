import Header from "../../components/app/Header";
import Footer from "../../components/app/Footer";
import AppointmentBookingForm from "../../components/app/forms/AppointmentBookingForm";

function DocSearch() {
  function handleFormSubmit(formData: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <Header />

      <div>
        <AppointmentBookingForm />
      </div>

      <Footer isFixed={false} />
    </div>
  );
}
export default DocSearch;
