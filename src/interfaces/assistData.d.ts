export interface LowerDiv {
  prefix: string;
  courseNumber: string; // some may be "22C" or "45L"
  courseTitle: string;
  courseId?: number; // series courses do not have a course ID
  cid?: string; // c-ids are added later
}

interface SeriesIdObject {
  seriesId: number;
}

interface ccNameObject {
  ccName: string;
}

interface agreementLinkObject {
  agreementLink: string;
}

export type UnfilteredSeries = (LowerDiv | string | SeriesIdObject)[];
export type Series = (LowerDiv | string)[];

type Articulation = LowerDiv | Series;

export type FullArticulation = (
  | Articulation
  | string // connector like "and" or "or"
  | ccNameObject
  | agreementLinkObject
)[];

export type ApiArticulations = { result: FullArticulation }[];
