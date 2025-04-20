import React, { useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import useAuth from "@/hooks/useAuth";
import UserService from "@/services/user/user.service";

const CheckoutForm = ({subscription_fee}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, updateUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (response.error) {
      console.log(response.error.message);
    } else {
      await UserService.updateRoleUser()
        .then((res) => {
          updateUser({ role: res.updatedUser.role });
          window.location.href = "/member/paymentSuccess";
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-11/12 max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-700">
            Bienvenue, {user.lastName}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Le coût de la création de votre profil est de{" "}
            <span className="font-semibold text-primary">{subscription_fee} €</span>.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Complétez votre paiement
          </h2>
          <PaymentElement />
          <button
            type="submit"
            disabled={!stripe}
            className="w-full mt-4 py-2 bg-primary text-white rounded-md text-lg disabled:bg-gray-400"
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
