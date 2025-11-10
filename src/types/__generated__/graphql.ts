export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Banking account number is a string of 5 to 17 alphanumeric values for representing an generic account number */
  AccountNumber: { input: any; output: any };
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any };
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: { input: any; output: any };
  /** A country code as defined by ISO 3166-1 alpha-2 */
  CountryCode: { input: any; output: any };
  /** A country name (short name) as defined by ISO 3166-1 */
  CountryName: { input: any; output: any };
  /** A field whose value conforms to the standard cuid format as specified in https://github.com/ericelliott/cuid#broken-down */
  Cuid: { input: any; output: any };
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: { input: any; output: any };
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: { input: any; output: any };
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any };
  /** A field whose value conforms to the standard DeweyDecimal format as specified by the OCLC https://www.oclc.org/content/dam/oclc/dewey/resources/summaries/deweysummaries.pdf */
  DeweyDecimal: { input: any; output: any };
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: { input: any; output: any };
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any };
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: { input: any; output: any };
  /** A GeoJSON object as defined by RFC 7946: https://datatracker.ietf.org/doc/html/rfc7946 */
  GeoJSON: { input: any; output: any };
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: { input: any; output: any };
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: { input: any; output: any };
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: { input: any; output: any };
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: { input: any; output: any };
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: { input: any; output: any };
  /** A field whose value is either an IPv4 or IPv6 address: https://en.wikipedia.org/wiki/IP_address. */
  IP: { input: any; output: any };
  /** A field whose value is an IPC Class Symbol within the International Patent Classification System: https://www.wipo.int/classifications/ipc/en/ */
  IPCPatent: { input: any; output: any };
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: { input: any; output: any };
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: { input: any; output: any };
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: { input: any; output: any };
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any };
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: any; output: any };
  /** A field whose value conforms to the Library of Congress Subclass Format ttps://www.loc.gov/catdir/cpso/lcco/ */
  LCCSubclass: { input: any; output: any };
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: { input: any; output: any };
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: { input: any; output: any };
  /** A local date-time string (i.e., with no associated timezone) in `YYYY-MM-DDTHH:mm:ss` format, e.g. `2020-01-01T00:00:00`. */
  LocalDateTime: { input: any; output: any };
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: { input: any; output: any };
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: { input: any; output: any };
  /** The locale in the format of a BCP 47 (RFC 5646) standard string */
  Locale: { input: any; output: any };
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: { input: any; output: any };
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: { input: any; output: any };
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: { input: any; output: any };
  /** Floats that will have a value less than 0. */
  NegativeFloat: { input: any; output: any };
  /** Integers that will have a value less than 0. */
  NegativeInt: { input: any; output: any };
  /** A string that cannot be passed as an empty value */
  NonEmptyString: { input: any; output: any };
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: { input: any; output: any };
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: { input: any; output: any };
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: { input: any; output: any };
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: { input: any; output: any };
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: { input: any; output: any };
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: { input: any; output: any };
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: { input: any; output: any };
  /** Floats that will have a value greater than 0. */
  PositiveFloat: { input: any; output: any };
  /** Integers that will have a value greater than 0. */
  PositiveInt: { input: any; output: any };
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: { input: any; output: any };
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: { input: any; output: any };
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: { input: any; output: any };
  /** In the US, an ABA routing transit number (`ABA RTN`) is a nine-digit code to identify the financial institution. */
  RoutingNumber: { input: any; output: any };
  /** A field whose value conforms to the standard personal number (personnummer) formats for Sweden */
  SESSN: { input: any; output: any };
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: { input: any; output: any };
  /** A field whose value is a Semantic Version: https://semver.org */
  SemVer: { input: any; output: any };
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: { input: any; output: any };
  /** A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones */
  TimeZone: { input: any; output: any };
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: any; output: any };
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any };
  /** A currency string, such as $21.25 */
  USCurrency: { input: any; output: any };
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: { input: any; output: any };
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: { input: any; output: any };
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: { input: any; output: any };
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: { input: any; output: any };
  /** Represents NULL values */
  Void: { input: any; output: any };
};

export type AcceptPostingInput = {
  token: Scalars["String"]["input"];
};

export type AnalyticsKey = {
  __typename: "AnalyticsKey";
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type Application = {
  __typename: "Application";
  clientId: Scalars["String"]["output"];
  clientSecret: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
  url: Maybe<Scalars["String"]["output"]>;
};

export type ApplicationFilterInput = {
  AND?: InputMaybe<Array<ApplicationFilterInput>>;
  NOT?: InputMaybe<ApplicationFilterInput>;
  OR?: InputMaybe<Array<ApplicationFilterInput>>;
  clientId?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ApplicationList = List & {
  __typename: "ApplicationList";
  count: Scalars["Int"]["output"];
  items: Array<Application>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type ApplicationListFilterInput = {
  some?: InputMaybe<ApplicationFilterInput>;
};

export type ApplicationResponse = Response & {
  __typename: "ApplicationResponse";
  application: Maybe<Application>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ApplicationSortInput = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AssessmentCenter = {
  __typename: "AssessmentCenter";
  address: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  maximumCapacity: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  phoneNumber: Maybe<Scalars["String"]["output"]>;
  postings: PostingList;
  proximity: Proximity;
  state: Taxonomy;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type AssessmentCenterPostingsArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<PostingFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<PostingSortInput>>;
};

export type AssessmentCenterFilterInput = {
  AND?: InputMaybe<Array<AssessmentCenterFilterInput>>;
  NOT?: InputMaybe<AssessmentCenterFilterInput>;
  OR?: InputMaybe<Array<AssessmentCenterFilterInput>>;
  address?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  maximumCapacity?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  phoneNumber?: InputMaybe<StringFilterInput>;
  proximity?: InputMaybe<StringFilterInput>;
  stateCode?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AssessmentCenterList = List & {
  __typename: "AssessmentCenterList";
  count: Scalars["Int"]["output"];
  items: Array<AssessmentCenter>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type AssessmentCenterListFilterInput = {
  some?: InputMaybe<AssessmentCenterFilterInput>;
};

export type AssessmentCenterResponse = Response & {
  __typename: "AssessmentCenterResponse";
  item: Maybe<AssessmentCenter>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type AssessmentCenterSortInput = {
  createdAt?: InputMaybe<SortOrder>;
  maximumCapacity?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
  stateCode?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type Attendance = {
  __typename: "Attendance";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  picture: Maybe<AttendancePicture>;
  posting: Posting;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type AttendanceFilterInput = {
  AND?: InputMaybe<Array<AttendanceFilterInput>>;
  NOT?: InputMaybe<AttendanceFilterInput>;
  OR?: InputMaybe<Array<AttendanceFilterInput>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  posting?: InputMaybe<PostingFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AttendanceList = List & {
  __typename: "AttendanceList";
  count: Scalars["Int"]["output"];
  items: Array<Attendance>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type AttendancePicture = {
  __typename: "AttendancePicture";
  createdAt: Scalars["DateTime"]["output"];
  file: File;
  id: Scalars["ID"]["output"];
  thumbnailUri: Scalars["URL"]["output"];
  uri: Scalars["URL"]["output"];
};

export type AttendanceResponse = Response & {
  __typename: "AttendanceResponse";
  item: Maybe<Attendance>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type AttendanceSortInput = {
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AuthResponse = Response & {
  __typename: "AuthResponse";
  accessToken: Maybe<Scalars["JWT"]["output"]>;
  message: Maybe<Scalars["String"]["output"]>;
  refreshToken: Maybe<Scalars["JWT"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
  /** Only public user information can be queried here. */
  user: Maybe<User>;
};

export type AuthRule = {
  allow: AuthStrategy;
  ownerField?: InputMaybe<Scalars["String"]["input"]>;
};

export type AuthState = {
  __typename: "AuthState";
  accessToken: Scalars["String"]["output"];
  refreshToken: Scalars["String"]["output"];
};

export enum AuthStrategy {
  Admin = "admin",
  /**
   * To restrict a record's access to a specific user, use the `owner` strategy.
   * When `owner` authorization is configured, only the record's `owner` and admins are allowed the specified operations.
   */
  Owner = "owner",
}

export type BankDetailsInput = {
  bankAccountName: Scalars["String"]["input"];
  bankAccountNumber: Scalars["String"]["input"];
  bankSlug: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  nin: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
};

export type CenterAllowance = {
  __typename: "CenterAllowance";
  amount: Scalars["Int"]["output"];
  center: AssessmentCenter;
  cohort: Cohort;
  createdAt: Scalars["DateTime"]["output"];
  exceptions: Array<Role>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type CenterAllowanceResponse = {
  __typename: "CenterAllowanceResponse";
  item: Maybe<CenterAllowance>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type CenterConfiguration = {
  __typename: "CenterConfiguration";
  center: AssessmentCenter;
  cohort: Cohort;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  postings: Array<Posting>;
  roleLimits: Array<RoleLimit>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type CenterConfigurationResponse = Response & {
  __typename: "CenterConfigurationResponse";
  item: Maybe<CenterConfiguration>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type Cohort = {
  __typename: "Cohort";
  attendances: AttendanceList;
  centerAllowances: Array<CenterAllowance>;
  centerConfigurations: Array<CenterConfiguration>;
  cohortAllowances: Array<CohortAllowance>;
  createdAt: Scalars["DateTime"]["output"];
  durationInDays: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  postings: PostingList;
  postingsCount: Scalars["Int"]["output"];
  publishedAt: Maybe<Scalars["DateTime"]["output"]>;
  rankAllowances: Array<RankAllowance>;
  roleAllowances: Array<RoleAllowance>;
  roleConfigurations: Array<RoleConfiguration>;
  startDate: Scalars["DateTime"]["output"];
  status: Taxonomy;
  totalAcceptedCount: Scalars["Int"]["output"];
  totalAllowanceAmount: Scalars["Float"]["output"];
  totalPendingCount: Scalars["Int"]["output"];
  totalPostingsCount: Scalars["Int"]["output"];
  totalRejectedCount: Scalars["Int"]["output"];
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type CohortAttendancesArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<AttendanceFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<AttendanceSortInput>>;
};

export type CohortPostingsArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<PostingFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<PostingSortInput>>;
};

export type CohortAllowance = {
  __typename: "CohortAllowance";
  amount: Scalars["Int"]["output"];
  cohort: Cohort;
  createdAt: Scalars["DateTime"]["output"];
  exceptions: Array<Role>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type CohortAllowanceResponse = {
  __typename: "CohortAllowanceResponse";
  item: Maybe<CohortAllowance>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type CohortFilterInput = {
  AND?: InputMaybe<Array<CohortFilterInput>>;
  NOT?: InputMaybe<CohortFilterInput>;
  OR?: InputMaybe<Array<CohortFilterInput>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  durationInDays?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  postings?: InputMaybe<PostingListFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CohortList = List & {
  __typename: "CohortList";
  count: Scalars["Int"]["output"];
  items: Array<Cohort>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type CohortListFilterInput = {
  some?: InputMaybe<CohortFilterInput>;
};

export type CohortResponse = Response & {
  __typename: "CohortResponse";
  item: Maybe<Cohort>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type CohortSortInput = {
  createdAt?: InputMaybe<SortOrder>;
  durationInDays?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  publishedAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ContentStatus {
  Archived = "ARCHIVED",
  Completed = "COMPLETED",
  Draft = "DRAFT",
  Pending = "PENDING",
  Published = "PUBLISHED",
}

export type CoordinatorAnalytics = {
  __typename: "CoordinatorAnalytics";
  id: Scalars["ID"]["output"];
  timestamp: Scalars["DateTime"]["output"];
  totalAssessmentsCount: Scalars["Int"]["output"];
  totalCoursesCount: Scalars["Int"]["output"];
  totalInstructorsCount: Scalars["Int"]["output"];
  totalInvigilatorsCount: Scalars["Int"]["output"];
  totalLearnersCount: Scalars["Int"]["output"];
};

export type CountryContinent = {
  __typename: "CountryContinent";
  code: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type CountryCurrency = {
  __typename: "CountryCurrency";
  code: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  precision: Scalars["Int"]["output"];
  symbol: Scalars["String"]["output"];
};

export type CountryInfo = {
  __typename: "CountryInfo";
  capital: Scalars["String"]["output"];
  code: Scalars["String"]["output"];
  continent: CountryContinent;
  currencies: Array<CountryCurrency>;
  flagEmoji: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  locales: Array<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  nativeName: Scalars["String"]["output"];
  phone: CountryPhone;
};

export type CountryPhone = {
  __typename: "CountryPhone";
  code: Scalars["String"]["output"];
  example: ExamplePhoneNumber;
  id: Scalars["ID"]["output"];
};

export type CreateAssessmentCenterInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  maximumCapacity: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  proximity: Proximity;
  stateCode: Scalars["String"]["input"];
};

export type CreateCenterAllowanceInput = {
  centerId: Scalars["ID"]["input"];
  cohortId: Scalars["ID"]["input"];
  fields: EditCenterAllowanceInput;
};

export type CreateCenterConfigurationInput = {
  assessmentCenterId: Scalars["ID"]["input"];
  cohortId: Scalars["ID"]["input"];
  roleLimits: Array<CreateRoleLimitInput>;
};

export type CreateCohortAllowanceInput = {
  cohortId: Scalars["ID"]["input"];
  fields: EditCohortAllowanceInput;
};

export type CreateManyAssessmentCentersInput = {
  inputs: Array<CreateAssessmentCenterInput>;
};

export type CreateManyPostingsInput = {
  inputs: Array<CreatePostingInput>;
};

export type CreatePostingInput = {
  centerId: Scalars["ID"]["input"];
  cohortId: Scalars["ID"]["input"];
  userIds: Array<Scalars["ID"]["input"]>;
};

export type CreateRankAllowanceInput = {
  cohortId: Scalars["ID"]["input"];
  fields: EditRankAllowanceInput;
  rankId: Scalars["ID"]["input"];
};

export type CreateRankInput = {
  fields: EditRankInput;
};

export type CreateRoleAllowanceInput = {
  cohortId: Scalars["ID"]["input"];
  fields: EditRoleAllowanceInput;
  roleId: Scalars["ID"]["input"];
};

export type CreateRoleConfigurationInput = {
  cohortId: Scalars["ID"]["input"];
  fields: EditRoleConfigurationInput;
  roleId: Scalars["ID"]["input"];
};

export type CreateRoleInput = {
  fields: EditRoleInput;
  userIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type CreateRoleLimitInput = {
  limit: Scalars["Int"]["input"];
  roleId: Scalars["ID"]["input"];
};

export type CreateRoleLimitInputWithConfig = {
  centerConfigurationId: Scalars["ID"]["input"];
  limit: Scalars["Int"]["input"];
  roleId: Scalars["ID"]["input"];
};

export type CreateUserFieldsInput = {
  bankAccountName?: InputMaybe<Scalars["String"]["input"]>;
  bankAccountNumber?: InputMaybe<Scalars["String"]["input"]>;
  bankSlug?: InputMaybe<Scalars["String"]["input"]>;
  bvn?: InputMaybe<Scalars["String"]["input"]>;
  countryCode?: InputMaybe<Scalars["String"]["input"]>;
  dateOfBirth?: InputMaybe<Scalars["DateTime"]["input"]>;
  email?: InputMaybe<Scalars["EmailAddress"]["input"]>;
  firstName: Scalars["String"]["input"];
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  middleName?: InputMaybe<Scalars["String"]["input"]>;
  nin?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["PhoneNumber"]["input"]>;
  staffId?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateUserInput = {
  fields: CreateUserFieldsInput;
  rankId?: InputMaybe<Scalars["ID"]["input"]>;
  roleId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type DateTimeFilterInput = {
  equals?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  not?: InputMaybe<Scalars["DateTime"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
};

export type DeleteAccountInput = {
  reason?: InputMaybe<Scalars["String"]["input"]>;
  token: Scalars["String"]["input"];
};

export type Device = {
  __typename: "Device";
  model: Maybe<Scalars["String"]["output"]>;
  vendor: Maybe<Scalars["String"]["output"]>;
};

export enum EditAction {
  Create = "CREATE",
  Delete = "DELETE",
  Update = "UPDATE",
}

export type EditApplicationInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  url?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditAssessmentCenterInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  maximumCapacity?: InputMaybe<Scalars["Int"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  proximity: Proximity;
  stateCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditCenterAllowanceInput = {
  amount: Scalars["Int"]["input"];
  exceptions?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  name: Scalars["String"]["input"];
};

export type EditCohortAllowanceInput = {
  amount: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
};

export type EditCohortInput = {
  durationInDays: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  startDate: Scalars["DateTime"]["input"];
};

export type EditPostingInput = {
  centerId: Scalars["ID"]["input"];
  id: Scalars["ID"]["input"];
};

export type EditRankAllowanceInput = {
  amount: Scalars["Int"]["input"];
  durationInDays: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
};

export type EditRankInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  order?: InputMaybe<Scalars["Int"]["input"]>;
};

export type EditRoleAllowanceInput = {
  amount: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
};

export type EditRoleConfigurationInput = {
  durationInDays: Scalars["Int"]["input"];
};

export type EditRoleInput = {
  description: Scalars["String"]["input"];
  displayName: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type ExamplePhoneNumber = {
  __typename: "ExamplePhoneNumber";
  e164: Scalars["String"]["output"];
  international: Scalars["String"]["output"];
  national: Scalars["String"]["output"];
};

export type File = {
  __typename: "File";
  createdAt: Scalars["DateTime"]["output"];
  downloadUri: Maybe<Scalars["URL"]["output"]>;
  encoding: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  mimetype: Scalars["String"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
  size: Scalars["Int"]["output"];
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type FloatFilterInput = {
  equals?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<Scalars["Float"]["input"]>>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  not?: InputMaybe<Scalars["Float"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["Float"]["input"]>>;
};

export enum Gender {
  Female = "FEMALE",
  Male = "MALE",
}

export type GifOutputOptionsInput = {
  force?: InputMaybe<Scalars["Boolean"]["input"]>;
  loop?: InputMaybe<Scalars["Int"]["input"]>;
};

export type IpInfo = {
  __typename: "IPInfo";
  city: Maybe<Scalars["String"]["output"]>;
  country: Maybe<CountryInfo>;
  id: Scalars["ID"]["output"];
  ip: Scalars["String"]["output"];
  isEU: Maybe<Scalars["Boolean"]["output"]>;
  loc: Maybe<Scalars["String"]["output"]>;
  org: Maybe<Scalars["String"]["output"]>;
  region: Maybe<Scalars["String"]["output"]>;
  timezone: Maybe<Scalars["String"]["output"]>;
};

export enum IdentityType {
  Email = "EMAIL",
  PhoneNumber = "PHONE_NUMBER",
  Username = "USERNAME",
}

/** https://docs.aws.amazon.com/solutions/latest/serverless-image-handler/create-and-use-image-requests.html */
export type ImageEditInput = {
  blur?: InputMaybe<Scalars["Int"]["input"]>;
  flatten?: InputMaybe<Scalars["Boolean"]["input"]>;
  flip?: InputMaybe<Scalars["Boolean"]["input"]>;
  flop?: InputMaybe<Scalars["Boolean"]["input"]>;
  gif?: InputMaybe<GifOutputOptionsInput>;
  grayscale?: InputMaybe<Scalars["Boolean"]["input"]>;
  jpeg?: InputMaybe<ImageOutputOptionsInput>;
  negate?: InputMaybe<Scalars["Boolean"]["input"]>;
  normalise?: InputMaybe<Scalars["Boolean"]["input"]>;
  png?: InputMaybe<ImageOutputOptionsInput>;
  resize?: InputMaybe<ImageResize>;
  roundCrop?: InputMaybe<Scalars["Boolean"]["input"]>;
  smartCrop?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ImageOutputOptionsInput = {
  /** 0 - 100 */
  quality?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ImageResize = {
  background?: InputMaybe<ImageResizeBackgroundInput>;
  fit?: InputMaybe<ImageResizeFit>;
  /** north, northeast, east, southeast, south, southwest, west, northwest, center or centre */
  gravity?: InputMaybe<Scalars["String"]["input"]>;
  height: Scalars["PositiveInt"]["input"];
  /** top, right top, right, right bottom, bottom, left bottom, left, left top */
  position?: InputMaybe<Scalars["String"]["input"]>;
  width: Scalars["PositiveInt"]["input"];
};

export type ImageResizeBackgroundInput = {
  alpha: Scalars["Int"]["input"];
  b: Scalars["Int"]["input"];
  g: Scalars["Int"]["input"];
  r: Scalars["Int"]["input"];
};

export enum ImageResizeFit {
  Contain = "contain",
  Cover = "cover",
  Fill = "fill",
  Inside = "inside",
  Outside = "outside",
}

export type ImportUserInput = {
  invigilators?: InputMaybe<Array<InvigilatorInput>>;
};

export type InstructorAnalytics = {
  __typename: "InstructorAnalytics";
  id: Scalars["ID"]["output"];
  timestamp: Scalars["DateTime"]["output"];
  totalManagedAssessmentsCount: Scalars["Int"]["output"];
  totalManagedCoursesCount: Scalars["Int"]["output"];
};

export type IntFilterInput = {
  equals?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  not?: InputMaybe<Scalars["Int"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export type IntListFilterInput = {
  /** The list matches the given value exactly. */
  equals?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** The given value exists in the list. */
  has?: InputMaybe<Scalars["Int"]["input"]>;
  /** Every value exists in the list. */
  hasEvery?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** At least one value exists in the list. */
  hasSome?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** The list is empty. */
  isEmpty?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type InvigilatorInput = {
  bank_account?: InputMaybe<Scalars["String"]["input"]>;
  bank_account_name?: InputMaybe<Scalars["String"]["input"]>;
  bank_name?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["DateTime"]["input"]>;
  date?: InputMaybe<Scalars["Date"]["input"]>;
  email: Scalars["String"]["input"];
  gender: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["Int"]["input"]>;
  id_number?: InputMaybe<Scalars["String"]["input"]>;
  is_dlc_tutor?: InputMaybe<Scalars["Boolean"]["input"]>;
  is_priority_department?: InputMaybe<Scalars["Boolean"]["input"]>;
  is_university_staff?: InputMaybe<Scalars["Boolean"]["input"]>;
  last_modified?: InputMaybe<Scalars["DateTime"]["input"]>;
  level: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  role: Scalars["String"]["input"];
  uuid?: InputMaybe<Scalars["String"]["input"]>;
  verified_staff?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type LastPayslip = {
  __typename: "LastPayslip";
  createdAt: Scalars["DateTime"]["output"];
  file: File;
  id: Scalars["ID"]["output"];
  thumbnailUri: Scalars["URL"]["output"];
  uri: Scalars["URL"]["output"];
};

export type LinkPreview = {
  __typename: "LinkPreview";
  audio: Maybe<Scalars["String"]["output"]>;
  author: Maybe<Scalars["String"]["output"]>;
  date: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  image: Maybe<Scalars["String"]["output"]>;
  lang: Maybe<Scalars["String"]["output"]>;
  logo: Maybe<Scalars["String"]["output"]>;
  publisher: Maybe<Scalars["String"]["output"]>;
  title: Maybe<Scalars["String"]["output"]>;
  url: Scalars["String"]["output"];
  video: Maybe<Scalars["String"]["output"]>;
};

export type LinkPreviewInput = {
  audio?: InputMaybe<Scalars["String"]["input"]>;
  author?: InputMaybe<Scalars["String"]["input"]>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  lang?: InputMaybe<Scalars["String"]["input"]>;
  logo?: InputMaybe<Scalars["String"]["input"]>;
  publisher?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  url: Scalars["String"]["input"];
  video?: InputMaybe<Scalars["String"]["input"]>;
};

export type List = {
  count: Scalars["Int"]["output"];
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type Log = {
  __typename: "Log";
  application: Application;
  clientIp: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  data: Maybe<Scalars["JSON"]["output"]>;
  description: Scalars["String"]["output"];
  error: Maybe<Scalars["String"]["output"]>;
  event: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  /** To prevent delays, avoid querying this field alongside other fields in the same query. */
  ipInfo: Maybe<IpInfo>;
  user: Maybe<User>;
  userAgent: Scalars["String"]["output"];
};

export type LogFilterInput = {
  AND?: InputMaybe<Array<LogFilterInput>>;
  OR?: InputMaybe<Array<LogFilterInput>>;
  clientId?: InputMaybe<StringFilterInput>;
  clientIp?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  event?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  userId?: InputMaybe<StringFilterInput>;
};

export type LogList = {
  __typename: "LogList";
  count: Scalars["Int"]["output"];
  items: Array<Log>;
  totalCount: Scalars["Int"]["output"];
};

export type LogSortInput = {
  createdAt?: InputMaybe<SortOrder>;
};

export type LoginWithPasswordInput = {
  identity: Scalars["String"]["input"];
  identityType: IdentityType;
  password: Scalars["String"]["input"];
  passwordType: PasswordType;
};

export type LoginWithSocialProviderInput = {
  provider: SocialProvider;
  token: Scalars["String"]["input"];
  tokenType: TokenType;
};

export type ManyAssessmentCenterResponse = Response & {
  __typename: "ManyAssessmentCenterResponse";
  items: Maybe<Array<AssessmentCenter>>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyCenterAllowanceResponse = {
  __typename: "ManyCenterAllowanceResponse";
  items: Array<CenterAllowance>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyCenterConfigurationResponse = Response & {
  __typename: "ManyCenterConfigurationResponse";
  items: Maybe<Array<CenterConfiguration>>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyCohortAllowanceResponse = {
  __typename: "ManyCohortAllowanceResponse";
  items: Array<CohortAllowance>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyPostingResponse = Response & {
  __typename: "ManyPostingResponse";
  items: Maybe<Array<Posting>>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyRankAllowanceResponse = {
  __typename: "ManyRankAllowanceResponse";
  items: Array<RankAllowance>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyRoleAllowanceResponse = {
  __typename: "ManyRoleAllowanceResponse";
  items: Array<RoleAllowance>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyRoleConfigurationResponse = Response & {
  __typename: "ManyRoleConfigurationResponse";
  items: Array<RoleConfiguration>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyRoleLimitResponse = Response & {
  __typename: "ManyRoleLimitResponse";
  items: Maybe<Array<RoleLimit>>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyUserResponse = Response & {
  __typename: "ManyUserResponse";
  items: Array<User>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type ManyUserRoleResponse = Response & {
  __typename: "ManyUserRoleResponse";
  items: Array<UserRole>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type Mutation = {
  __typename: "Mutation";
  acceptPosting: PostingResponse;
  createApplication: ApplicationResponse;
  createCenterConfiguration: CenterConfigurationResponse;
  createCohort: CohortResponse;
  createManyAssessmentCenters: ManyAssessmentCenterResponse;
  createManyCenterAllowances: ManyCenterAllowanceResponse;
  createManyCohortAllowances: ManyCohortAllowanceResponse;
  createManyPostings: ManyPostingResponse;
  createManyRankAllowances: ManyRankAllowanceResponse;
  createManyRoleAllowances: ManyRoleAllowanceResponse;
  createManyRoleConfigurations: ManyRoleConfigurationResponse;
  createManyUserRoles: ManyUserRoleResponse;
  createManyUsers: ManyUserResponse;
  createPostings: ManyPostingResponse;
  createRank: RankResponse;
  createRole: RoleResponse;
  createRoleLimits: ManyRoleLimitResponse;
  createUserAccount: AuthResponse;
  deleteApplication: ApplicationResponse;
  deleteAttendance: AttendanceResponse;
  deleteCenterConfigurations: ManyCenterConfigurationResponse;
  deleteCohort: CohortResponse;
  deleteCurrentUserAccount: MutationResponse;
  deleteManyAssessmentCenters: ManyAssessmentCenterResponse;
  deleteManyCenterAllowances: ManyCenterAllowanceResponse;
  deleteManyCohortAllowances: ManyCohortAllowanceResponse;
  deleteManyPostings: ManyPostingResponse;
  deleteManyRankAllowances: ManyRankAllowanceResponse;
  deleteManyRoleAllowances: ManyRoleAllowanceResponse;
  deleteManyRoleConfigurations: ManyRoleConfigurationResponse;
  deleteManyUserRoles: ManyUserRoleResponse;
  deleteRank: RankResponse;
  deleteRole: RoleResponse;
  deleteRoleLimits: ManyRoleLimitResponse;
  deleteSession: SessionResponse;
  deleteSigningKey: SigningKeyResponse;
  deleteUser: UserResponse;
  generateCohortPostings: CohortResponse;
  importUsers: ManyUserResponse;
  loginWithPassword: AuthResponse;
  loginWithSocialProvider: AuthResponse;
  logout: MutationResponse;
  markCohortAsCompleted: CohortResponse;
  ping: Scalars["String"]["output"];
  publishCohort: CohortResponse;
  rejectPosting: PostingResponse;
  removeCurrentUserPicture: UserResponse;
  removeUserPicture: UserResponse;
  requestCurrentUserDeleteAccountEmail: MutationResponse;
  requestCurrentUserDeleteAccountSMS: MutationResponse;
  requestCurrentUserEmailVerification: MutationResponse;
  requestCurrentUserPhoneNumberVerification: MutationResponse;
  requestEmailLoginOTP: MutationResponse;
  requestResetPasswordEmail: MutationResponse;
  requestResetPasswordSMS: MutationResponse;
  requestSMSLoginOTP: MutationResponse;
  resetPassword: MutationResponse;
  revokeCurrentUserSessionById: SessionResponse;
  rotateAndRevokeCurrentSigningKey: MutationResponse;
  rotateApplicationSecret: ApplicationResponse;
  rotateCurrentSigningKey: SigningKeyResponse;
  sendUserPasswordResetEmail: MutationResponse;
  sendUserPasswordResetSMS: MutationResponse;
  sendUserVerificationEmail: MutationResponse;
  sendUserVerificationSMS: MutationResponse;
  setAdmins: ManyUserResponse;
  signedUpdatePostedUser: UserResponse;
  tick: Scalars["String"]["output"];
  unpublishCohort: CohortResponse;
  updateApplication: ApplicationResponse;
  updateCenterAllowance: CenterAllowanceResponse;
  updateCenterConfiguration: CenterConfigurationResponse;
  updateCohort: CohortResponse;
  updateCohortAllowance: CohortAllowanceResponse;
  updateCurrentUserBVN: UserResponse;
  updateCurrentUserBasicInfo: UserResponse;
  updateCurrentUserNIN: UserResponse;
  updateCurrentUserPhoneNumber: UserResponse;
  updateCurrentUserUsername: UserResponse;
  updateManyAssessmentCenters: ManyAssessmentCenterResponse;
  updateManyUsers: ManyUserResponse;
  updatePosting: PostingResponse;
  updateRank: RankResponse;
  updateRankAllowance: RankAllowanceResponse;
  updateRole: RoleResponse;
  updateRoleAllowance: RoleAllowanceResponse;
  updateRoleConfiguration: RoleConfigurationResponse;
  updateRoleLimit: RoleLimitResponse;
  updateUserBVN: UserResponse;
  updateUserEmail: UserResponse;
  updateUserNIN: UserResponse;
  updateUserPhoneNumber: UserResponse;
  updateUserStatus: UserResponse;
  verifyUser: UserResponse;
  verifyUserEmail: UserResponse;
  verifyUserPhoneNumber: UserResponse;
};

export type MutationAcceptPostingArgs = {
  input: AcceptPostingInput;
};

export type MutationCreateApplicationArgs = {
  input: EditApplicationInput;
};

export type MutationCreateCenterConfigurationArgs = {
  input: CreateCenterConfigurationInput;
};

export type MutationCreateCohortArgs = {
  input: EditCohortInput;
};

export type MutationCreateManyAssessmentCentersArgs = {
  input: CreateManyAssessmentCentersInput;
};

export type MutationCreateManyCenterAllowancesArgs = {
  inputs: Array<CreateCenterAllowanceInput>;
};

export type MutationCreateManyCohortAllowancesArgs = {
  inputs: Array<CreateCohortAllowanceInput>;
};

export type MutationCreateManyPostingsArgs = {
  input: CreateManyPostingsInput;
};

export type MutationCreateManyRankAllowancesArgs = {
  inputs: Array<CreateRankAllowanceInput>;
};

export type MutationCreateManyRoleAllowancesArgs = {
  inputs: Array<CreateRoleAllowanceInput>;
};

export type MutationCreateManyRoleConfigurationsArgs = {
  inputs: Array<CreateRoleConfigurationInput>;
};

export type MutationCreateManyUserRolesArgs = {
  inputs: Array<UserRoleInput>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateManyUsersArgs = {
  inputs: Array<CreateUserInput>;
  sendPasswordResetEmail?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationCreatePostingsArgs = {
  autoPublish?: InputMaybe<Scalars["Boolean"]["input"]>;
  input: CreatePostingInput;
};

export type MutationCreateRankArgs = {
  input: CreateRankInput;
};

export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};

export type MutationCreateRoleLimitsArgs = {
  inputs: Array<CreateRoleLimitInputWithConfig>;
};

export type MutationCreateUserAccountArgs = {
  input: CreateUserFieldsInput;
};

export type MutationDeleteApplicationArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteAttendanceArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteCenterConfigurationsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteCohortArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteCurrentUserAccountArgs = {
  input: DeleteAccountInput;
};

export type MutationDeleteManyAssessmentCentersArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteManyCenterAllowancesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteManyCohortAllowancesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteManyPostingsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteManyRankAllowancesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteManyRoleAllowancesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteManyRoleConfigurationsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteManyUserRolesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteRankArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteRoleArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteRoleLimitsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteSessionArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteSigningKeyArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationGenerateCohortPostingsArgs = {
  excludeIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id: Scalars["ID"]["input"];
};

export type MutationImportUsersArgs = {
  input: ImportUserInput;
};

export type MutationLoginWithPasswordArgs = {
  input: LoginWithPasswordInput;
};

export type MutationLoginWithSocialProviderArgs = {
  input: LoginWithSocialProviderInput;
};

export type MutationLogoutArgs = {
  allDevices?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationMarkCohortAsCompletedArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationPublishCohortArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRejectPostingArgs = {
  input: RejectPostingInput;
};

export type MutationRemoveUserPictureArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRequestCurrentUserDeleteAccountEmailArgs = {
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRequestCurrentUserDeleteAccountSmsArgs = {
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRequestEmailLoginOtpArgs = {
  email: Scalars["EmailAddress"]["input"];
};

export type MutationRequestResetPasswordEmailArgs = {
  email: Scalars["EmailAddress"]["input"];
};

export type MutationRequestResetPasswordSmsArgs = {
  phoneNumber: Scalars["PhoneNumber"]["input"];
};

export type MutationRequestSmsLoginOtpArgs = {
  phoneNumber: Scalars["PhoneNumber"]["input"];
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationRevokeCurrentUserSessionByIdArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRotateApplicationSecretArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSendUserPasswordResetEmailArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSendUserPasswordResetSmsArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSendUserVerificationEmailArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSendUserVerificationSmsArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSetAdminsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  isAdmin: Scalars["Boolean"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSignedUpdatePostedUserArgs = {
  input: SignedUpdateUserInput;
};

export type MutationUnpublishCohortArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateApplicationArgs = {
  id: Scalars["ID"]["input"];
  input: EditApplicationInput;
};

export type MutationUpdateCenterAllowanceArgs = {
  input: UpdateCenterAllowanceInput;
};

export type MutationUpdateCenterConfigurationArgs = {
  input: UpdateCenterConfigurationInput;
};

export type MutationUpdateCohortArgs = {
  input: UpdateCohortInput;
};

export type MutationUpdateCohortAllowanceArgs = {
  input: UpdateCohortAllowanceInput;
};

export type MutationUpdateCurrentUserBvnArgs = {
  bvn?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateCurrentUserBasicInfoArgs = {
  input: UpdateCurrentUserInput;
};

export type MutationUpdateCurrentUserNinArgs = {
  nin?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateCurrentUserPhoneNumberArgs = {
  phoneNumber?: InputMaybe<Scalars["PhoneNumber"]["input"]>;
};

export type MutationUpdateCurrentUserUsernameArgs = {
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateManyAssessmentCentersArgs = {
  input: UpdateManyAssessmentCentersInput;
};

export type MutationUpdateManyUsersArgs = {
  inputs: Array<UpdateUserInput>;
};

export type MutationUpdatePostingArgs = {
  input: EditPostingInput;
};

export type MutationUpdateRankArgs = {
  input: UpdateRankInput;
};

export type MutationUpdateRankAllowanceArgs = {
  input: UpdateRankAllowanceInput;
};

export type MutationUpdateRoleArgs = {
  id: Scalars["ID"]["input"];
  input: EditRoleInput;
};

export type MutationUpdateRoleAllowanceArgs = {
  input: UpdateRoleAllowanceInput;
};

export type MutationUpdateRoleConfigurationArgs = {
  input: UpdateRoleConfigurationInput;
};

export type MutationUpdateRoleLimitArgs = {
  input: UpdateRoleLimitInput;
};

export type MutationUpdateUserBvnArgs = {
  bvn?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUserEmailArgs = {
  email: Scalars["EmailAddress"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUserNinArgs = {
  id: Scalars["ID"]["input"];
  nin?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateUserPhoneNumberArgs = {
  id: Scalars["ID"]["input"];
  phoneNumber?: InputMaybe<Scalars["PhoneNumber"]["input"]>;
};

export type MutationUpdateUserStatusArgs = {
  id: Scalars["ID"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
  status: UserStatus;
};

export type MutationVerifyUserArgs = {
  input: VerifyUserInput;
};

export type MutationVerifyUserEmailArgs = {
  input: VerifyEmailInput;
};

export type MutationVerifyUserPhoneNumberArgs = {
  input: VerifyPhoneNumberInput;
};

export type MutationResponse = Response & {
  __typename: "MutationResponse";
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export enum NetworkStatus {
  Offline = "OFFLINE",
  Published = "PUBLISHED",
}

export enum PasswordType {
  Database = "DATABASE",
  Otp = "OTP",
}

export type Picture = {
  downloadUri: Scalars["URL"]["output"];
  height: Maybe<Scalars["Int"]["output"]>;
  sizeInBytes: Maybe<Scalars["Int"]["output"]>;
  thumbnailUri: Scalars["URL"]["output"];
  uri: Scalars["URL"]["output"];
  width: Maybe<Scalars["Int"]["output"]>;
};

export type PictureThumbnailUriArgs = {
  edits?: InputMaybe<ImageEditInput>;
};

export type PictureUriArgs = {
  edits?: InputMaybe<ImageEditInput>;
};

export type Posting = {
  __typename: "Posting";
  allowanceAmount: Scalars["Int"]["output"];
  attendance: Array<Attendance>;
  attendanceDaysCount: Scalars["Int"]["output"];
  center: AssessmentCenter;
  cohort: Cohort;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  lastPayslip: Maybe<LastPayslip>;
  maximumAttendanceDays: Scalars["Int"]["output"];
  rejectionReason: Maybe<Scalars["String"]["output"]>;
  scoreInPercentage: Scalars["Float"]["output"];
  status: Taxonomy;
  teammates: Array<Posting>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
  user: User;
};

export type PostingFilterInput = {
  AND?: InputMaybe<Array<PostingFilterInput>>;
  NOT?: InputMaybe<PostingFilterInput>;
  OR?: InputMaybe<Array<PostingFilterInput>>;
  attendanceDaysCount?: InputMaybe<IntFilterInput>;
  center?: InputMaybe<AssessmentCenterFilterInput>;
  cohort?: InputMaybe<CohortFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  maximumAttendanceDays?: InputMaybe<IntFilterInput>;
  scoreInPercentage?: InputMaybe<FloatFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UserFilterInput>;
};

export type PostingList = List & {
  __typename: "PostingList";
  count: Scalars["Int"]["output"];
  items: Array<Posting>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type PostingListFilterInput = {
  none?: InputMaybe<PostingFilterInput>;
  some?: InputMaybe<PostingFilterInput>;
};

export type PostingResponse = Response & {
  __typename: "PostingResponse";
  item: Maybe<Posting>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type PostingSortInput = {
  center?: InputMaybe<AssessmentCenterSortInput>;
  cohort?: InputMaybe<CohortSortInput>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserSortInput>;
};

export enum PostingStatus {
  Accepted = "ACCEPTED",
  Pending = "PENDING",
  Rejected = "REJECTED",
}

export enum Proximity {
  Far = "FAR",
  Near = "NEAR",
}

export type Query = {
  __typename: "Query";
  admins: UserList;
  application: Maybe<Application>;
  applications: ApplicationList;
  assessmentCenter: Maybe<AssessmentCenter>;
  assessmentCenters: AssessmentCenterList;
  attendance: Maybe<Attendance>;
  auth: Maybe<AuthState>;
  banks: Array<Taxonomy>;
  centerConfiguration: CenterConfiguration;
  cohort: Maybe<Cohort>;
  cohorts: CohortList;
  coordinatorAnalytics: CoordinatorAnalytics;
  getCountries: Array<CountryInfo>;
  getCurrentUserPostingTeam: Array<Posting>;
  getPostingByStaffId: Maybe<Posting>;
  getPostingByToken: Maybe<Posting>;
  getUserPostingToken: Maybe<Scalars["String"]["output"]>;
  instructorAnalytics: InstructorAnalytics;
  /** ipInfo is a third-party API that provides information about an IP address. */
  ipInfo: Maybe<IpInfo>;
  log: Maybe<Log>;
  logs: LogList;
  me: User;
  posting: Maybe<Posting>;
  postings: PostingList;
  rank: Maybe<Rank>;
  ranks: Array<Rank>;
  role: Maybe<Role>;
  roles: RoleList;
  signingKeys: SigningKeyList;
  states: Array<Taxonomy>;
  timeis: Scalars["DateTime"]["output"];
  user: Maybe<User>;
  userAnalyticsKeys: Array<AnalyticsKey>;
  userManagementAnalytics: UserManagementAnalytics;
  users: UserList;
};

export type QueryAdminsArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<UserFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<UserSortInput>>;
};

export type QueryApplicationArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryApplicationsArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<ApplicationFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<ApplicationSortInput>>;
};

export type QueryAssessmentCenterArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryAssessmentCentersArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<AssessmentCenterFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<AssessmentCenterSortInput>>;
};

export type QueryAttendanceArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCenterConfigurationArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCohortArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCohortsArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<CohortFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<CohortSortInput>>;
};

export type QueryGetPostingByStaffIdArgs = {
  staffId: Scalars["ID"]["input"];
};

export type QueryGetPostingByTokenArgs = {
  token: Scalars["String"]["input"];
};

export type QueryGetUserPostingTokenArgs = {
  staffId: Scalars["ID"]["input"];
};

export type QueryIpInfoArgs = {
  ip: Scalars["String"]["input"];
};

export type QueryLogArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryLogsArgs = {
  filter?: InputMaybe<LogFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<LogSortInput>;
};

export type QueryPostingArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryPostingsArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<PostingFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<PostingSortInput>>;
};

export type QueryRankArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRoleArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRolesArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<RoleFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<RoleSortInput>>;
};

export type QuerySigningKeysArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<SigningKeyFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<SigningKeySortInput>>;
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryUsersArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<UserFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<UserSortInput>>;
};

export type Rank = {
  __typename: "Rank";
  createdAt: Scalars["DateTime"]["output"];
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  order: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type RankAllowance = {
  __typename: "RankAllowance";
  amount: Scalars["Int"]["output"];
  cohort: Cohort;
  createdAt: Scalars["DateTime"]["output"];
  durationInDays: Scalars["Int"]["output"];
  exceptions: Array<Role>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  rank: Rank;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type RankAllowanceResponse = {
  __typename: "RankAllowanceResponse";
  item: Maybe<RankAllowance>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type RankResponse = Response & {
  __typename: "RankResponse";
  item: Maybe<Rank>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type RejectPostingInput = {
  reason: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type ResetPasswordInput = {
  identity: Scalars["String"]["input"];
  identityType: IdentityType;
  password: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type Response = {
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type Role = {
  __typename: "Role";
  createdAt: Scalars["DateTime"]["output"];
  description: Maybe<Scalars["String"]["output"]>;
  displayName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
  usersAssignedToRole: UserRoleList;
};

export type RoleUsersAssignedToRoleArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<UserRoleFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<UserRoleSortInput>>;
};

export type RoleAllowance = {
  __typename: "RoleAllowance";
  amount: Scalars["Int"]["output"];
  cohort: Cohort;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  role: Role;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type RoleAllowanceResponse = {
  __typename: "RoleAllowanceResponse";
  item: Maybe<RoleAllowance>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type RoleConfiguration = {
  __typename: "RoleConfiguration";
  cohort: Cohort;
  createdAt: Scalars["DateTime"]["output"];
  durationInDays: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  role: Role;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type RoleConfigurationResponse = Response & {
  __typename: "RoleConfigurationResponse";
  item: Maybe<RoleConfiguration>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type RoleFilterInput = {
  AND?: InputMaybe<Array<RoleFilterInput>>;
  NOT?: InputMaybe<RoleFilterInput>;
  OR?: InputMaybe<Array<RoleFilterInput>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  displayName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RoleLimit = {
  __typename: "RoleLimit";
  centerConfiguration: CenterConfiguration;
  id: Scalars["ID"]["output"];
  limit: Scalars["Int"]["output"];
  role: Role;
};

export type RoleLimitResponse = Response & {
  __typename: "RoleLimitResponse";
  item: Maybe<RoleLimit>;
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type RoleList = List & {
  __typename: "RoleList";
  count: Scalars["Int"]["output"];
  items: Array<Role>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type RoleListFilterInput = {
  some?: InputMaybe<RoleFilterInput>;
};

export type RoleResponse = Response & {
  __typename: "RoleResponse";
  message: Maybe<Scalars["String"]["output"]>;
  role: Maybe<Role>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type RoleSortInput = {
  createdAt?: InputMaybe<SortOrder>;
  displayName?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type Session = {
  __typename: "Session";
  application: Application;
  clientId: Scalars["ID"]["output"];
  clientIp: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  device: Maybe<Device>;
  id: Scalars["ID"]["output"];
  /** To prevent delays, avoid querying this field alongside other fields in the same query. */
  ipInfo: Maybe<IpInfo>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
  userAgent: Maybe<Scalars["String"]["output"]>;
};

export type SessionFilterInput = {
  AND?: InputMaybe<Array<SessionFilterInput>>;
  NOT?: InputMaybe<SessionFilterInput>;
  OR?: InputMaybe<Array<SessionFilterInput>>;
  clientId?: InputMaybe<StringFilterInput>;
  clientIp?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userAgent?: InputMaybe<StringFilterInput>;
};

export type SessionList = List & {
  __typename: "SessionList";
  count: Scalars["Int"]["output"];
  items: Array<Session>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type SessionResponse = Response & {
  __typename: "SessionResponse";
  message: Maybe<Scalars["String"]["output"]>;
  session: Maybe<Session>;
  success: Scalars["Boolean"]["output"];
};

export type SessionSortInput = {
  clientIp?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  device?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserSortInput>;
  userAgent?: InputMaybe<SortOrder>;
};

export type SignedUpdateUserInput = {
  fields: UpdatePostedUserInput;
  id: Scalars["ID"]["input"];
  token: Scalars["String"]["input"];
};

export type SigningKey = {
  __typename: "SigningKey";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  revokedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type SigningKeyFilterInput = {
  AND?: InputMaybe<Array<SigningKeyFilterInput>>;
  OR?: InputMaybe<Array<SigningKeyFilterInput>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  revokedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SigningKeyList = List & {
  __typename: "SigningKeyList";
  count: Scalars["Int"]["output"];
  items: Array<SigningKey>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type SigningKeyListFilterInput = {
  some?: InputMaybe<SigningKeyFilterInput>;
};

export type SigningKeyResponse = Response & {
  __typename: "SigningKeyResponse";
  message: Maybe<Scalars["String"]["output"]>;
  signingKey: Maybe<SigningKey>;
  success: Maybe<Scalars["Boolean"]["output"]>;
};

export type SigningKeySortInput = {
  createdAt?: InputMaybe<SortOrder>;
  revokedAt?: InputMaybe<SortOrder>;
};

export enum SocialProvider {
  Apple = "APPLE",
  Google = "GOOGLE",
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

/** https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators */
export type StringFilterInput = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** Mode does not apply to search and will throw an error if used with search. */
  mode?: InputMaybe<StringSearchMode>;
  not?: InputMaybe<Scalars["String"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search */
  search?: InputMaybe<Scalars["String"]["input"]>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * Scalar list filters allow you to filter by the contents of a list / array field.
 *
 * Scalar list / array filters ignore NULL values . Using isEmpty or NOT does not return records with NULL value lists / arrays, and { equals: null } results in an error.
 */
export type StringListFilterInput = {
  /** The list matches the given value exactly. */
  equals?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** The given value exists in the list. */
  has?: InputMaybe<Scalars["String"]["input"]>;
  /** Every value exists in the list. */
  hasEvery?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** At least one value exists in the list. */
  hasSome?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** The list is empty. */
  isEmpty?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum StringSearchMode {
  Default = "default",
  Insensitive = "insensitive",
}

export type Subscription = {
  __typename: "Subscription";
  pong: Scalars["String"]["output"];
  tock: Scalars["String"]["output"];
};

export type Taxonomy = {
  __typename: "Taxonomy";
  classification: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export enum TokenType {
  Code = "CODE",
  IdToken = "ID_TOKEN",
}

export type UpdateAssessmentCenterInput = {
  fields: EditAssessmentCenterInput;
  id: Scalars["ID"]["input"];
};

export type UpdateBasicUserInput = {
  bankAccountName?: InputMaybe<Scalars["String"]["input"]>;
  bankAccountNumber?: InputMaybe<Scalars["String"]["input"]>;
  bankSlug?: InputMaybe<Scalars["String"]["input"]>;
  bvn?: InputMaybe<Scalars["String"]["input"]>;
  countryCode?: InputMaybe<Scalars["String"]["input"]>;
  dateOfBirth?: InputMaybe<Scalars["DateTime"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  middleName?: InputMaybe<Scalars["String"]["input"]>;
  nin?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["PhoneNumber"]["input"]>;
  staffId?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateCenterAllowanceInput = {
  fields: EditCenterAllowanceInput;
  id: Scalars["ID"]["input"];
};

export type UpdateCenterConfigurationInput = {
  id: Scalars["ID"]["input"];
  roleLimits: Array<CreateRoleLimitInput>;
};

export type UpdateCohortAllowanceInput = {
  fields: EditCohortAllowanceInput;
  id: Scalars["ID"]["input"];
};

export type UpdateCohortInput = {
  fields: EditCohortInput;
  id: Scalars["ID"]["input"];
};

export type UpdateCurrentUserInput = {
  fields: UpdateBasicUserInput;
  rankId?: InputMaybe<Scalars["ID"]["input"]>;
  roleId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UpdateManyAssessmentCentersInput = {
  inputs: Array<UpdateAssessmentCenterInput>;
};

export type UpdatePostedUserInput = {
  bankAccountName?: InputMaybe<Scalars["String"]["input"]>;
  bankAccountNumber?: InputMaybe<Scalars["String"]["input"]>;
  bankSlug?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["PhoneNumber"]["input"]>;
};

export type UpdateRankAllowanceInput = {
  fields: EditRankAllowanceInput;
  id: Scalars["ID"]["input"];
};

export type UpdateRankInput = {
  fields: EditRankInput;
  id: Scalars["ID"]["input"];
};

export type UpdateRoleAllowanceInput = {
  fields: EditRoleAllowanceInput;
  id: Scalars["ID"]["input"];
};

export type UpdateRoleConfigurationInput = {
  fields: EditRoleConfigurationInput;
  id: Scalars["ID"]["input"];
};

export type UpdateRoleLimitInput = {
  id: Scalars["ID"]["input"];
  limit: Scalars["Int"]["input"];
};

export type UpdateUserInput = {
  id: Scalars["ID"]["input"];
  input: UpdateBasicUserInput;
  rankId?: InputMaybe<Scalars["ID"]["input"]>;
  roleId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type User = {
  __typename: "User";
  bank: Maybe<Taxonomy>;
  bankAccountName: Maybe<Scalars["String"]["output"]>;
  bankAccountNumber: Maybe<Scalars["String"]["output"]>;
  blockedAt: Maybe<Scalars["DateTime"]["output"]>;
  bvn: Maybe<Scalars["String"]["output"]>;
  country: Maybe<CountryInfo>;
  createdAt: Scalars["DateTime"]["output"];
  dateOfBirth: Maybe<Scalars["DateTime"]["output"]>;
  deactivatedAt: Maybe<Scalars["DateTime"]["output"]>;
  email: Maybe<Scalars["EmailAddress"]["output"]>;
  firstName: Maybe<Scalars["String"]["output"]>;
  fullName: Maybe<Scalars["String"]["output"]>;
  gender: Maybe<Taxonomy>;
  id: Scalars["ID"]["output"];
  ipAllowList: Maybe<Array<Scalars["String"]["output"]>>;
  ipBlockList: Maybe<Array<Scalars["String"]["output"]>>;
  isAdmin: Scalars["Boolean"]["output"];
  isBvnVerified: Scalars["Boolean"]["output"];
  isEmailVerified: Scalars["Boolean"]["output"];
  isMe: Scalars["Boolean"]["output"];
  isNinVerified: Scalars["Boolean"]["output"];
  isPhoneNumberVerified: Scalars["Boolean"]["output"];
  language: Maybe<Scalars["Locale"]["output"]>;
  lastName: Maybe<Scalars["String"]["output"]>;
  logs: LogList;
  middleName: Maybe<Scalars["String"]["output"]>;
  nin: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Maybe<Scalars["PhoneNumber"]["output"]>;
  picture: Maybe<UserPicture>;
  rank: Maybe<Rank>;
  sessions: SessionList;
  socialPictureUrl: Maybe<Scalars["String"]["output"]>;
  staffId: Maybe<Scalars["ID"]["output"]>;
  status: Maybe<Taxonomy>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
  userRole: Maybe<UserRole>;
  username: Maybe<Scalars["String"]["output"]>;
};

export type UserLogsArgs = {
  filter?: InputMaybe<UserLogFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<LogSortInput>;
};

export type UserSessionsArgs = {
  cursor?: InputMaybe<Scalars["ID"]["input"]>;
  filter?: InputMaybe<SessionFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<Array<SessionSortInput>>;
};

export type UserFilterInput = {
  AND?: InputMaybe<Array<UserFilterInput>>;
  NOT?: InputMaybe<UserFilterInput>;
  OR?: InputMaybe<Array<UserFilterInput>>;
  bvn?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  isAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastName?: InputMaybe<StringFilterInput>;
  middleName?: InputMaybe<StringFilterInput>;
  nin?: InputMaybe<StringFilterInput>;
  phoneNumber?: InputMaybe<StringFilterInput>;
  postings?: InputMaybe<PostingListFilterInput>;
  staffId?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  userRole?: InputMaybe<UserRoleFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UserList = List & {
  __typename: "UserList";
  count: Scalars["Int"]["output"];
  items: Array<User>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type UserListFilterInput = {
  some?: InputMaybe<UserFilterInput>;
};

export type UserLogFilterInput = {
  AND?: InputMaybe<Array<UserLogFilterInput>>;
  OR?: InputMaybe<Array<UserLogFilterInput>>;
  clientId?: InputMaybe<StringFilterInput>;
  clientIp?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  event?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<StringFilterInput>;
};

export type UserManagementAnalytics = {
  __typename: "UserManagementAnalytics";
  id: Scalars["ID"]["output"];
  timestamp: Scalars["DateTime"]["output"];
  totalApplicationsCount: Scalars["Int"]["output"];
  totalCentersCount: Scalars["Int"]["output"];
  totalRolesCount: Scalars["Int"]["output"];
  totalUsersCount: Scalars["Int"]["output"];
};

export type UserPicture = {
  __typename: "UserPicture";
  createdAt: Scalars["DateTime"]["output"];
  file: File;
  id: Scalars["ID"]["output"];
  thumbnailUri: Scalars["URL"]["output"];
  uri: Scalars["URL"]["output"];
};

export type UserResponse = Response & {
  __typename: "UserResponse";
  message: Maybe<Scalars["String"]["output"]>;
  success: Maybe<Scalars["Boolean"]["output"]>;
  user: Maybe<User>;
};

export type UserRole = {
  __typename: "UserRole";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  role: Role;
  user: User;
};

export type UserRoleFilterInput = {
  AND?: InputMaybe<Array<UserRoleFilterInput>>;
  OR?: InputMaybe<Array<UserRoleFilterInput>>;
  assignee?: InputMaybe<UserFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<RoleFilterInput>;
};

export type UserRoleInput = {
  roleId: Scalars["ID"]["input"];
  userId: Scalars["ID"]["input"];
};

export type UserRoleList = List & {
  __typename: "UserRoleList";
  count: Scalars["Int"]["output"];
  items: Array<UserRole>;
  nextCursor: Maybe<Scalars["ID"]["output"]>;
  totalCount: Scalars["Int"]["output"];
};

export type UserRoleListFilterInput = {
  some?: InputMaybe<UserRoleFilterInput>;
};

export type UserRoleSortInput = {
  assignee?: InputMaybe<UserSortInput>;
  createdAt?: InputMaybe<SortOrder>;
  role?: InputMaybe<RoleSortInput>;
};

export type UserSortInput = {
  createdAt?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  middleName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userRole?: InputMaybe<UserRoleSortInput>;
};

/**
 * Represents the various statuses a user can have in the system.
 *
 * - `PROVISIONED`: The user account is set up and ready to be activated.
 * - `ACTIVE`: The user account is activated.
 * - `BLOCKED`: The user account is denied access.
 * - `DEACTIVATED`: The user account is deactivated.
 */
export enum UserStatus {
  Active = "ACTIVE",
  Blocked = "BLOCKED",
  Deactivated = "DEACTIVATED",
  Provisioned = "PROVISIONED",
}

export type VerifyEmailInput = {
  email: Scalars["EmailAddress"]["input"];
  token: Scalars["String"]["input"];
};

export type VerifyPhoneNumberInput = {
  phoneNumber: Scalars["PhoneNumber"]["input"];
  token: Scalars["String"]["input"];
};

export type VerifyUserInput = {
  staffId: Scalars["ID"]["input"];
  userId: Scalars["ID"]["input"];
};

export type AuthStateQueryVariables = Exact<{ [key: string]: never }>;

export type AuthStateQuery = {
  auth: {
    __typename: "AuthState";
    accessToken: string;
    refreshToken: string;
  } | null;
};

export type LoginWithPasswordMutationVariables = Exact<{
  input: LoginWithPasswordInput;
}>;

export type LoginWithPasswordMutation = {
  loginWithPassword: {
    __typename: "AuthResponse";
    success: boolean | null;
    message: string | null;
    accessToken: any | null;
    refreshToken: any | null;
    user: {
      __typename: "User";
      id: string;
      firstName: string | null;
      lastName: string | null;
      fullName: string | null;
      username: string | null;
      staffId: string | null;
      email: any | null;
      isAdmin: boolean;
      phoneNumber: any | null;
      picture: {
        __typename: "UserPicture";
        id: string;
        thumbnailUri: any;
        uri: any;
      } | null;
      userRole: {
        __typename: "UserRole";
        id: string;
        role: {
          __typename: "Role";
          id: string;
          name: string;
          displayName: string;
          description: string | null;
        };
      } | null;
      rank: {
        __typename: "Rank";
        id: string;
        name: string;
        description: string | null;
      } | null;
    } | null;
  };
};

export type GetUserSessionQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserSessionQuery = {
  me: {
    __typename: "User";
    id: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    username: string | null;
    staffId: string | null;
    email: any | null;
    isAdmin: boolean;
    phoneNumber: any | null;
    picture: {
      __typename: "UserPicture";
      id: string;
      thumbnailUri: any;
      uri: any;
    } | null;
    userRole: {
      __typename: "UserRole";
      id: string;
      role: {
        __typename: "Role";
        id: string;
        name: string;
        displayName: string;
        description: string | null;
      };
    } | null;
    rank: {
      __typename: "Rank";
      id: string;
      name: string;
      description: string | null;
    } | null;
  };
};

export type GetCurrentUserPostingTeamQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetCurrentUserPostingTeamQuery = {
  getCurrentUserPostingTeam: Array<{
    __typename: "Posting";
    id: string;
    user: {
      __typename: "User";
      id: string;
      fullName: string | null;
      staffId: string | null;
      picture: {
        __typename: "UserPicture";
        id: string;
        thumbnailUri: any;
        uri: any;
      } | null;
    };
    attendance: Array<{
      __typename: "Attendance";
      id: string;
      createdAt: any;
      picture: {
        __typename: "AttendancePicture";
        id: string;
        uri: any;
        thumbnailUri: any;
      } | null;
    }>;
  }>;
};
