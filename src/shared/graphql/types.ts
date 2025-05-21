import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Alert = {
  __typename?: 'Alert';
  id: Scalars['Int']['output'];
  page?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  urlContent?: Maybe<Scalars['String']['output']>;
  urlTrigger?: Maybe<Scalars['String']['output']>;
};

export type AlertFilter = {
  date?: InputMaybe<Scalars['String']['input']>;
  dev?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ChangeOffer {
  Empty = 'EMPTY',
  Filled = 'FILLED'
}

export enum ChangeState {
  Cancelled = 'CANCELLED',
  Complete = 'COMPLETE',
  Progress = 'PROGRESS'
}

export type ChangeUpdateFilter = {
  action?: InputMaybe<Scalars['String']['input']>;
  changeId?: InputMaybe<Scalars['Int']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  offered?: InputMaybe<Scalars['String']['input']>;
  otherUserId?: InputMaybe<Scalars['Int']['input']>;
  otherUserName?: InputMaybe<Scalars['String']['input']>;
  requested?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type Collection = {
  __typename?: 'Collection';
  code: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  subject?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type CollectionFilter = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type CollectionPagination = {
  __typename?: 'CollectionPagination';
  data?: Maybe<Array<Maybe<Collection>>>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Collectors = {
  __typename?: 'Collectors';
  recent?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Element = {
  __typename?: 'Element';
  code: Scalars['Int']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  comment2?: Maybe<Scalars['String']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  imgDate?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nameEx?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  order: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type Exchange = {
  __typename?: 'Exchange';
  collection?: Maybe<Collection>;
  his?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  mine?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type FeedbackFilter = {
  from?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLike?: Maybe<Scalars['Int']['output']>;
  deleteCollection?: Maybe<Scalars['Int']['output']>;
  deleteLike?: Maybe<Scalars['Int']['output']>;
  favCollection?: Maybe<Scalars['Int']['output']>;
  joinCollection?: Maybe<Scalars['Int']['output']>;
  newChange?: Maybe<Scalars['Int']['output']>;
  sleepCollection?: Maybe<Scalars['Int']['output']>;
  updateChange?: Maybe<Scalars['Int']['output']>;
};


export type MutationAddLikeArgs = {
  params: FeedbackFilter;
};


export type MutationDeleteCollectionArgs = {
  params: UserCollectionSettingsFilter;
};


export type MutationDeleteLikeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationFavCollectionArgs = {
  params: UserCollectionSettingsFilter;
};


export type MutationJoinCollectionArgs = {
  params: UserCollectionSettingsFilter;
};


export type MutationNewChangeArgs = {
  params: ChangeUpdateFilter;
};


export type MutationSleepCollectionArgs = {
  params: UserCollectionSettingsFilter;
};


export type MutationUpdateChangeArgs = {
  params: ChangeUpdateFilter;
};

export type PageFilter = {
  direction: Scalars['String']['input'];
  noMerge?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  per_page: Scalars['Int']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  allAlerts?: Maybe<Array<Maybe<Alert>>>;
  allCollections?: Maybe<Array<Maybe<Collection>>>;
  allElements?: Maybe<Array<Maybe<Element>>>;
  allNewExchanges?: Maybe<Array<Maybe<UserExchange>>>;
  allSearchCollections?: Maybe<Array<Maybe<SearchCollection>>>;
  allUserChanges?: Maybe<Array<Maybe<UserChange>>>;
  allUserCollections?: Maybe<Array<Maybe<UserCollection>>>;
  allUserExchanges?: Maybe<Array<Maybe<UserExchange>>>;
  changesPage?: Maybe<UserChangePagination>;
  collections?: Maybe<Array<Maybe<Collection>>>;
  collectionsPage?: Maybe<CollectionPagination>;
  currentUser?: Maybe<User>;
  exchangesPage?: Maybe<UserExchangePagination>;
  searchCollectionsPage?: Maybe<SearchCollectionPagination>;
  test?: Maybe<Test>;
  userChangesPage?: Maybe<UserChangePagination>;
  userCollectionEx?: Maybe<Array<Maybe<UserCollectionEx>>>;
  userCollectionExPage?: Maybe<UserCollectionExPagination>;
  userCollectionsPage?: Maybe<UserCollectionPagination>;
  userExchangesPage?: Maybe<UserExchangePagination>;
  userInfo?: Maybe<Array<Maybe<UserInfo>>>;
  userInfoEx?: Maybe<Array<Maybe<UserInfoEx>>>;
  users: Array<User>;
};


export type QueryAllAlertsArgs = {
  filter: AlertFilter;
};


export type QueryAllNewExchangesArgs = {
  filter: UserSearchChangeFilter;
};


export type QueryAllUserChangesArgs = {
  filter: UserChangeFilter;
};


export type QueryAllUserCollectionsArgs = {
  filter: UserCollectionFilter;
};


export type QueryAllUserExchangesArgs = {
  filter: UserChangeFilter;
};


export type QueryChangesPageArgs = {
  filter: UserChangeFilter;
  page: PageFilter;
};


export type QueryCollectionsArgs = {
  filter: CollectionFilter;
};


export type QueryCollectionsPageArgs = {
  filter: CollectionFilter;
  page: PageFilter;
};


export type QueryExchangesPageArgs = {
  filter: UserChangeFilter;
  page: PageFilter;
};


export type QuerySearchCollectionsPageArgs = {
  filter: CollectionFilter;
  page: PageFilter;
};


export type QueryUserChangesPageArgs = {
  filter: UserChangeFilter;
  page: PageFilter;
};


export type QueryUserCollectionExArgs = {
  filter: UserCollectionFilter;
};


export type QueryUserCollectionExPageArgs = {
  filter: UserCollectionFilter;
  page: PageFilter;
};


export type QueryUserCollectionsPageArgs = {
  filter: UserCollectionFilter;
  page: PageFilter;
};


export type QueryUserExchangesPageArgs = {
  filter: UserChangeFilter;
  page: PageFilter;
};


export type QueryUserInfoArgs = {
  filter: UserInfoFilter;
};


export type QueryUserInfoExArgs = {
  filter: UserInfoFilter;
};

export type SearchCollection = {
  __typename?: 'SearchCollection';
  collection: Collection;
  collectors: Collectors;
};

export type SearchCollectionPagination = {
  __typename?: 'SearchCollectionPagination';
  data?: Maybe<Array<Maybe<SearchCollection>>>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Test = {
  __typename?: 'Test';
  result?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UserChange = {
  __typename?: 'UserChange';
  chat?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  him?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  lastUpdater?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
  stateId?: Maybe<Scalars['Int']['output']>;
};

export type UserChangeFilter = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  otherUserId?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<ChangeState>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UserChangePagination = {
  __typename?: 'UserChangePagination';
  data?: Maybe<Array<Maybe<UserChange>>>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type UserCollection = {
  __typename?: 'UserCollection';
  collection: Collection;
  countElements?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  iduser: Scalars['Int']['output'];
  lastUpdated?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
  settings: Scalars['String']['output'];
};

export type UserCollectionEx = {
  __typename?: 'UserCollectionEx';
  code: Scalars['Int']['output'];
  countExchanges?: Maybe<Scalars['Int']['output']>;
  countFaults?: Maybe<Scalars['Int']['output']>;
  countRepeated?: Maybe<Scalars['Int']['output']>;
  elements?: Maybe<Array<Maybe<Element>>>;
  exchanges?: Maybe<Array<Maybe<UserExchange>>>;
  userCollection: UserCollection;
  userElements?: Maybe<Array<Maybe<UserElement>>>;
};

export type UserCollectionExPagination = {
  __typename?: 'UserCollectionExPagination';
  data?: Maybe<Array<Maybe<UserCollectionEx>>>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type UserCollectionFilter = {
  changes?: InputMaybe<Scalars['Boolean']['input']>;
  codes?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  elements?: InputMaybe<Scalars['Boolean']['input']>;
  state?: InputMaybe<ChangeState>;
  userElements?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UserCollectionPagination = {
  __typename?: 'UserCollectionPagination';
  data?: Maybe<Array<Maybe<UserCollection>>>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type UserCollectionSettingsFilter = {
  code?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type UserElement = {
  __typename?: 'UserElement';
  changeId?: Maybe<Scalars['Int']['output']>;
  changeState?: Maybe<Scalars['String']['output']>;
  code: Scalars['Int']['output'];
  date?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  iduser: Scalars['Int']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  order: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type UserExchange = {
  __typename?: 'UserExchange';
  change?: Maybe<UserChange>;
  exchanges?: Maybe<Array<Maybe<Exchange>>>;
  user?: Maybe<UserInfoEx>;
};

export type UserExchangePagination = {
  __typename?: 'UserExchangePagination';
  data?: Maybe<Array<Maybe<UserExchange>>>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  iduser: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  settings?: Maybe<Scalars['String']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
};

export type UserInfoEx = {
  __typename?: 'UserInfoEx';
  avatar?: Maybe<Scalars['String']['output']>;
  iduser: Scalars['Int']['output'];
  lastChange?: Maybe<Scalars['Int']['output']>;
  lastChangeFinished?: Maybe<Scalars['Int']['output']>;
  lastLogin?: Maybe<Scalars['Int']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  mine?: Maybe<Scalars['Int']['output']>;
  numChangesFinished?: Maybe<Scalars['Int']['output']>;
  numChangesNok?: Maybe<Scalars['Int']['output']>;
  numChangesStarted?: Maybe<Scalars['Int']['output']>;
  numChangesWith?: Maybe<Scalars['Int']['output']>;
  numCollections?: Maybe<Scalars['Int']['output']>;
  unanswered?: Maybe<Scalars['Int']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInfoFilter = {
  userId?: InputMaybe<Scalars['Int']['input']>;
  userIds: Array<Scalars['Int']['input']>;
};

export type UserSearchChangeFilter = {
  offer?: InputMaybe<ChangeOffer>;
  otherUserId?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};
