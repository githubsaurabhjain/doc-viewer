export const abstractMobileNumber = (phone: string, countryCode: string) => {
  if (phone.startsWith("+")) {
    phone = phone.slice(1);
  }

  if (countryCode && phone.trim().startsWith(countryCode)) {
    return phone.slice(countryCode.length, phone.length);
  }
  return phone;
};
