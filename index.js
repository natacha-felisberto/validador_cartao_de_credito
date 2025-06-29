

const validateCreditCard = (cardNumber) => {
  // Luhn Algorithm for validation
  const isValidCard = (number) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  // Determine card brand (bandeira)
  const getCardBrand = (number) => {
    const brands = {
      Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      MasterCard: /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{12}|[3-6][0-9]{13}|7[01][0-9]{12}|720[0-9]{12}))$/,
      AmericanExpress: /^3[47][0-9]{13}$/,
      Elo: /^(4011(78|79)|431274|438935|451416|457393|457631|457632|504175|506699|5067[0-6][0-9]|509[0-9]{3}|627780|636297|636368)[0-9]{10}$/,
      Hipercard: /^(38[0-9]{17}|60[0-9]{14})$/,
      DinersClub: /^3(0[0-5]|[68][0-9])[0-9]{11}$/,
      Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
      Aura: /^50[0-9]{14,17}$/,
      Maestro: /^(5[06789]|6)[0-9]{0,15}$/,
      VisaElectron: /^(4026|417500|4508|4844|4913|4917)[0-9]{12}$/,
    };

    for (const [brand, regex] of Object.entries(brands)) {
      if (regex.test(number)) {
        return brand;
      }
    }

    return "Unknown";
  };

  if (!cardNumber || typeof cardNumber !== "string") {
    return { valid: false, bandeira: "Invalid input" };
  }

  const valid = isValidCard(cardNumber);
  const bandeira = valid ? getCardBrand(cardNumber) : "Invalid card";

  return { valid, bandeira };
};

// Exemplo de uso
const cardNumber = "6362970000457013"; // Ex: número de teste da Elo
const result = validateCreditCard(cardNumber);
console.log(result);
