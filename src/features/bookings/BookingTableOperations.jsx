import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by latest booking" },

          { value: "startDate-asc", label: "Sort by earlier bookings" },
          {
            value: "totalPrice-desc",
            label: "Sort by highest total price",
          },
          { value: "totalPrice-asc", label: "Sort by lowest total price" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
