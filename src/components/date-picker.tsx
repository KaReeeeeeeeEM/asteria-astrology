"use client";
import { Text } from "@/components/language";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function dateString(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function DatePicker({
  id,
  value,
  onChange,
  invalid = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(new Date(2000, 0, 1));
  const year = new Date().getFullYear();
  const selected = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(value + "T12:00:00")
    : undefined;
  return (
    <div className="date-picker">
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="YYYY-MM-DD"
        inputMode="numeric"
        aria-invalid={invalid}
        autoComplete="bday"
      />
      <Popover
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (v && selected && !isNaN(selected.getTime())) setMonth(selected);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Open birth date calendar"
          >
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="date-calendar" align="end">
          <div className="calendar-selectors">
            <Select
              value={String(month.getMonth())}
              onValueChange={(m) =>
                setMonth(new Date(month.getFullYear(), Number(m), 1))
              }
            >
              <SelectTrigger aria-label="Birth month">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {months.map((m, i) => (
                    <SelectItem key={m} value={String(i)}>
                      <Text>{m}</Text>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={String(month.getFullYear())}
              onValueChange={(y) =>
                setMonth(new Date(Number(y), month.getMonth(), 1))
              }
            >
              <SelectTrigger aria-label="Birth year">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from({ length: year - 1899 }, (_, i) => year - i).map(
                    (y) => (
                      <SelectItem key={y} value={String(y)}>
                        <Text>{y}</Text>
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={
              selected && !isNaN(selected.getTime()) ? selected : undefined
            }
            onSelect={(d) => {
              if (d) {
                onChange(dateString(d));
                setOpen(false);
              }
            }}
            disabled={(d) => d < new Date(1900, 0, 1) || d > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
export function TimePicker({
  id,
  value,
  onChange,
  disabled,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  const [hours, minutes] = value.split(":");
  return (
    <div className="time-picker" id={id}>
      {[
        { label: "Birth hour", v: hours, total: 24, index: 0 },
        { label: "Birth minute", v: minutes, total: 60, index: 1 },
      ].map((x) => (
        <Select
          key={x.label}
          disabled={disabled}
          value={x.v}
          onValueChange={(v) =>
            onChange(x.index === 0 ? `${v}:${minutes}` : `${hours}:${v}`)
          }
        >
          <SelectTrigger aria-label={x.label}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: x.total }, (_, i) =>
                String(i).padStart(2, "0"),
              ).map((v) => (
                <SelectItem key={v} value={v}>
                  <Text>{v}</Text>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
