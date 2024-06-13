import Header from "./components/Header";
import Footer from "./components/Footer";
import AppointmentBookingForm from "./components/forms/AppointmentBookingForm";

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

      <Footer />
    </div>
  );
}
export default DocSearch;
