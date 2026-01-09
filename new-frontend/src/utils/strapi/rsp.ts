export default interface Rsp<T> {
	result: T | null;
	error: Error | null;
}
