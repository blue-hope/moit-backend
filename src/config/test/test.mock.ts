// // not work on Function.Object.<anonymous>.module.exports
// export const mockJsonWebToken = (payload: { sub: number; email: string }) => {
//   jest.mock('jsonwebtoken', () => ({
//     verify: jest.fn((token, secretOrKey, options, callback) => {
//       callback(null, {
//         payload: payload,
//         header: 'header',
//         signature: 'signature',
//       });
//     }),
//   }));
// };
