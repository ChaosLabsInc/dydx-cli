const OPTIONAL_CHOICE = "<<ALL>>";

export function OptinalValue(v: any): any {
  if (v === OPTIONAL_CHOICE) {
    return undefined;
  }
  if (v) return v !== undefined && v !== "" && v !== -1 ? v : undefined;
}

export function AppendOptionalAll(arr: any[]): any[] {
  arr.unshift(OPTIONAL_CHOICE);
  return arr;
}
