export const compareData = {
  methods: ["form", "charts", "data"],
  renders: ["client", "server", "hybrid"],
  complexity: ["simple", "average", "complex"],
};

export const strings = compareData.methods.flatMap((method) =>
  compareData.renders.flatMap((render) =>
    compareData.complexity.map(
      (complexity) => `${method}/${render}/${complexity}`,
    ),
  ),
);
