import { Input } from "./inputs/Input.js";
import { Textarea } from "./inputs/Textarea.js";
import { Select } from "./inputs/Select.js";
import { File } from "./inputs/File.js";

import { Checkbox } from "./controls/Checkbox.js";
import { Radio } from "./controls/Radio.js";
import { Switch } from "./controls/Switch.js";

import { Button } from "./helpers/Button.js";
import { Row } from "./helpers/Row.js";
import { Section } from "./helpers/Section.js";

import { Email } from "./shortcuts/Email.js";
import { Password } from "./shortcuts/Password.js";
import { Number } from "./shortcuts/Number.js";
import { Date } from "./shortcuts/Date.js";
import { Time } from "./shortcuts/Time.js";
import { Color } from "./shortcuts/Color.js";
import { Search } from "./shortcuts/Search.js";
import { Url } from "./shortcuts/Url.js";
import { Tel } from "./shortcuts/Tel.js";
import { Range } from "./shortcuts/Range.js";

import { Grid } from "./layouts/Grid.js";
import { Column } from "./layouts/Column.js";
import { Group } from "./layouts/Group.js";
import { Actions } from "./layouts/Actions.js";

export var Form = {

    // Inputs
    Input: Input,
    Textarea: Textarea,
    Select: Select,
    File: File,

    // Controls
    Checkbox: Checkbox,
    Radio: Radio,
    Switch: Switch,

    // Helpers
    Button: Button,
    Row: Row,
    Section: Section,

    // Shortcuts
    Email: Email,
    Password: Password,
    Number: Number,
    Date: Date,
    Time: Time,
    Color: Color,
    Search: Search,
    Url: Url,
    Tel: Tel,
    Range: Range,

    // Layouts
    Grid: Grid,
    Column: Column,
    Group: Group,
    Actions: Actions

};