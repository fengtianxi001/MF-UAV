import { defineComponent, createVNode, render, h } from 'vue'

export function componentRender(component: any, props: any) {
  const newComponent = defineComponent({
    render: () => h(component, props),
  })
  const instance = createVNode(newComponent)
  render(instance, document.createElement('div'))
  return instance.el as HTMLElement
}
