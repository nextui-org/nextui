"use client";

import {Button, Sheet} from "@heroui/react";

const NESTED_DIALOG_HEIGHT = "h-[320px]";

export function Nested() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">打开父面板</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog className={NESTED_DIALOG_HEIGHT}>
            <Sheet.Handle />
            <Sheet.CloseTrigger aria-label="关闭面板" />
            <Sheet.Header>
              <Sheet.Heading>父面板</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body className="flex flex-col justify-between pb-4">
              <p className="mb-4 text-sm text-muted">
                这是父面板。打开嵌套面板时，父面板会缩小，子面板滑入其上方。
              </p>
              <Sheet.NestedRoot>
                <Sheet.Trigger>
                  <Button className="w-full" variant="secondary">
                    打开嵌套面板
                  </Button>
                </Sheet.Trigger>
                <Sheet.Backdrop>
                  <Sheet.Content className="mx-auto max-w-[420px]">
                    <Sheet.Dialog className={NESTED_DIALOG_HEIGHT}>
                      <Sheet.Handle />
                      <Sheet.CloseTrigger aria-label="关闭面板" />
                      <Sheet.Header>
                        <Sheet.Heading>嵌套面板</Sheet.Heading>
                      </Sheet.Header>
                      <Sheet.Body>
                        <p className="mb-4 text-sm text-muted">
                          这是位于父面板上方的嵌套面板。向下拖动即可关闭并返回父面板。
                        </p>
                        <Sheet.NestedRoot>
                          <Sheet.Trigger>
                            <Button className="w-full" variant="secondary">
                              继续深入
                            </Button>
                          </Sheet.Trigger>
                          <Sheet.Backdrop>
                            <Sheet.Content className="mx-auto max-w-[420px]">
                              <Sheet.Dialog className={NESTED_DIALOG_HEIGHT}>
                                <Sheet.Handle />
                                <Sheet.CloseTrigger aria-label="关闭面板" />
                                <Sheet.Header>
                                  <Sheet.Heading>第三层</Sheet.Heading>
                                </Sheet.Header>
                                <Sheet.Body>
                                  <p className="text-sm text-muted">
                                    已经到达第三层！下一层打开时，其父面板会缩小，形成堆叠效果。
                                  </p>
                                </Sheet.Body>
                                <Sheet.Footer>
                                  <Sheet.Close>
                                    <Button className="w-full">关闭</Button>
                                  </Sheet.Close>
                                </Sheet.Footer>
                              </Sheet.Dialog>
                            </Sheet.Content>
                          </Sheet.Backdrop>
                        </Sheet.NestedRoot>
                      </Sheet.Body>
                      <Sheet.Footer>
                        <Sheet.Close>
                          <Button variant="secondary">返回</Button>
                        </Sheet.Close>
                      </Sheet.Footer>
                    </Sheet.Dialog>
                  </Sheet.Content>
                </Sheet.Backdrop>
              </Sheet.NestedRoot>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
