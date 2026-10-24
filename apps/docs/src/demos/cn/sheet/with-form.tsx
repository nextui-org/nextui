"use client";

import {Button, Input, Label, Sheet, TextField} from "@heroui/react";

export function WithForm() {
  return (
    <Sheet placement="right">
      <Sheet.Trigger>
        <Button variant="secondary">编辑个人资料</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="w-[400px]">
          <Sheet.Dialog>
            <Sheet.CloseTrigger aria-label="关闭面板" />
            <Sheet.Header>
              <Sheet.Heading>编辑个人资料</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <form className="flex flex-col gap-4">
                <TextField className="w-full" name="name" type="text">
                  <Label>姓名</Label>
                  <Input placeholder="输入姓名" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="email" type="email">
                  <Label>邮箱</Label>
                  <Input placeholder="输入邮箱" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="bio">
                  <Label>个人简介</Label>
                  <Input placeholder="介绍一下自己" variant="secondary" />
                </TextField>
              </form>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">取消</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button variant="secondary">保存更改</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
