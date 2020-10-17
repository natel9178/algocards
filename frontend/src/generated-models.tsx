import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  version: Scalars['String'];
};




export type GetVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVersionQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'version'>
);


export const GetVersionDocument = gql`
    query getVersion {
  version
}
    `;

/**
 * __useGetVersionQuery__
 *
 * To run a query within a React component, call `useGetVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVersionQuery(baseOptions?: Apollo.QueryHookOptions<GetVersionQuery, GetVersionQueryVariables>) {
        return Apollo.useQuery<GetVersionQuery, GetVersionQueryVariables>(GetVersionDocument, baseOptions);
      }
export function useGetVersionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVersionQuery, GetVersionQueryVariables>) {
          return Apollo.useLazyQuery<GetVersionQuery, GetVersionQueryVariables>(GetVersionDocument, baseOptions);
        }
export type GetVersionQueryHookResult = ReturnType<typeof useGetVersionQuery>;
export type GetVersionLazyQueryHookResult = ReturnType<typeof useGetVersionLazyQuery>;
export type GetVersionQueryResult = Apollo.QueryResult<GetVersionQuery, GetVersionQueryVariables>;