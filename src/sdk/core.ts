class IocContainer {
  private readonly mo: Record<string, any>
  constructor() {
    this.mo = {}
  }
  /**
   * @description 依赖注入
   * @param token
   * @returns
   */
  public Inject = <T>(token: (T & { name: string }) | string) => {
    return (target: Record<string, any>, key: string) => {
      target[key] = this.mo[typeof token === "string" ? token : token.name]
    }
  }

  /**
   * @description 实例托管至IOC容器 - 针对单例模式
   * @param token
   * @returns
   */
  public Injectable = (value?: any) => {
    return (target: any) => {
      this.mo[target.name] = new target(...(value || []))
    }
  }
  /**
   * @description 手动把实例托管至IOC容器 - 针对工厂模式
   * @param token
   * @param target
   */
  public Provider = (token: string, target: any) => {
    this.mo[token] = target
  }
}

export const container = new IocContainer()
export const { Injectable, Inject, Provider } = container
