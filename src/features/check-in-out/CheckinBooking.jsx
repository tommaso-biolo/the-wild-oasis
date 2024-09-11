import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingData } from "../bookings/useBookingData";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {

  const moveBack = useMoveBack();
  const { booking, isLoading } = useBookingData();
  const { checkIn, isCheckingIn } = useCheckIn();
  
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakFast] = useState(false);
  
  const {
    id: bookingId,
    guests,
    totalPrice,
    numNights,
    numGuests,
    hasBreakfast,
  } = booking;
  const { settings, isLoading: isLoadingSettings } = useSettings();
  
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
  
  function handleCheckin() {
    if (!confirmPaid) return;
    
    if (addBreakfast) {
      checkIn({bookingId, breakfast: {
        hasBreakfast : true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice
      }})
    } else {
      checkIn({bookingId, breakfast: {}});
    }
  }
  
  const optionalBreakfastPrice =
  settings.breakfastPrice * numNights * numGuests;
  
  if (isLoading || isLoadingSettings) return <Spinner />;
  if (Object.keys(booking).length === 0) return <Empty resource="booking" />;

  
  
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakFast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {optionalBreakfastPrice}?
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : ` ${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )}) `}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          {isCheckingIn ? "Checking in..." : `Check in booking #${bookingId}`}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
