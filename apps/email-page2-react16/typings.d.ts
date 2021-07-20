export {};

declare module "*.png";
declare global {
  interface Window {
    Garfish: any;
    __GARFISH__: any;
    isSlave: boolean;
    $slaveId: string | undefined;
    $ngccMenus: any;
  }
}
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
