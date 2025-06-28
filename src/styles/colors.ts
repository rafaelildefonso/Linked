// Define a paleta de cores para o aplicativo, baseada na logo "Linked".
// Inclui tons de cinza para texto e elementos neutros,
// e tons de azul para elementos primários e de destaque.

export const colors = {
  // Paleta de cinzas, variando de claro a escuro para texto, fundos e bordas.
  gray: {
    50: "#F8F8F8", // Um cinza muito claro, quase branco, para fundos suaves.
    100: "#EAEAEA", // Cinza claro para fundos e divisores.
    200: "#D4D4D8", // Um cinza um pouco mais escuro para elementos secundários.
    300: "#A1A1AA", // Cinza médio, bom para textos secundários ou placeholders.
    400: "#71717A", // Cinza escuro, próximo ao tom do texto na logo.
    500: "#52525B", // Um cinza mais escuro.
    600: "#3F3F46", // Cinza bem escuro, quase preto.
    700: "#27272A", // Tom escuro para texto principal.
    800: "#18181B", // Quase preto para textos importantes.
    900: "#09090B", // Preto para contrastes máximos.
  },

  // Paleta de azuis, inspirada na cor do ícone de clipe da logo "Linked".
  blue: {
    100: "#E0F2F7", // Um azul muito claro, para fundos sutis ou estados de hover.
    200: "#B3E0EE", // Azul claro para elementos secundários.
    300: "#85CEE6", // Um azul vibrante, mas mais suave que o principal.
    400: "#58BCE0", // Azul médio.
    500: "#2BAAD8", // O azul primário, diretamente da logo do clipe.
    600: "#228CB0", // Um azul mais escuro, para estados de pressionar ou bordas.
    700: "#196C88", // Azul escuro para textos de destaque ou ícones.
    800: "#104B60", // Azul muito escuro.
    900: "#072A38", // Azul quase preto, para contrastes profundos.
  },

  // Cores adicionais, caso precise de um verde de destaque como no exemplo original,
  // ou outras cores para feedback (sucesso, erro, aviso).
  green: {
    300: "#2DD4BF", // Um verde vibrante (exemplo mantido do seu modelo)
    900: "#042F2E", // Um verde escuro (exemplo mantido do seu modelo)
  },

  // Cores de feedback (opcional, mas útil para aplicativos)
  feedback: {
    success: "#34D399", // Verde para sucesso
    warning: "#FBBF24", // Amarelo para aviso
    error: "#EF4444", // Vermelho para erro
  },

  // Cores básicas (opcional, mas útil para reusar branco e preto puros)
  basic: {
    white: "#FFFFFF",
    black: "#000000",
  },
  yellow: {
    500: "#FFC700",
  },
};
