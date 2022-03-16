/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RestuarantParts
// ====================================================

export interface RestuarantParts_category {
  __typename: "Category";
  name: string;
}

export interface RestuarantParts {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: RestuarantParts_category | null;
  address: string;
  isPromoted: boolean;
}
