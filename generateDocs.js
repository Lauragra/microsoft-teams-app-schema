var parse = require('json-schema-to-markdown');
var fs = require('fs');

var schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "additionalProperties": false,
  "definitions" : {
      "platforms" : {
          "type": "array",
          "description": "This section defines the different environments supported by Teams application. 1. web refers to the Teams website running in a web browser on any compatible device/ computer. 2. Desktop refers to the installed package of Teams application on devices/ machines running Windows or Mac OS 3. phone refers to native apps (apk or ipa) running on Android or IOS Phone devices like iPhone, etc. 4. tablet refers to native apps (apk or ipa) running on Android or IOS Tablet devices like iPad, etc",
          "maxItems": 4,
          "items": {
              "enum": [
                  "web",
                  "desktop",
                  "phone",
                  "tablet"
              ]
          },
          "default" : ["web", "desktop", "phone", "tablet"]
      }
  },
  "properties": {
      "$schema": {
          "type": "string",
          "format": "uri"
      },
      "manifestVersion": {
          "type": "string",
          "description": "The version of the schema this manifest is using.",
          "const": "devPreview"
      },
      "version": {
          "type": "string",
          "description": "The version of the app. Changes to your manifest should cause a version change. This version string must follow the semver standard (http://semver.org).",
          "maxLength": 256
      },
      "id": {
          "type": "string",
          "description": "A unique identifier for this app. This id must be a GUID.",
          "pattern": "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"
      },
      "packageName": {
          "type": "string",
          "description": "A unique identifier for this app in reverse domain notation. E.g: com.example.myapp",
          "maxLength": 64
      },
      "developer": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "name": {
                  "type": "string",
                  "description": "The display name for the developer.",
                  "maxLength": 32
              },
              "websiteUrl": {
                  "type": "string",
                  "description": "The url to the page that provides support information for the app.",
                  "maxLength": 2048,
                  "pattern": "^[Hh][Tt][Tt][Pp][Ss]?://"
              },
              "privacyUrl": {
                  "type": "string",
                  "description": "The url to the page that provides privacy information for the app.",
                  "maxLength": 2048,
                  "pattern": "^[Hh][Tt][Tt][Pp][Ss]?://"
              },
              "termsOfUseUrl": {
                  "type": "string",
                  "description": "The url to the page that provides the terms of use for the app.",
                  "maxLength": 2048,
                  "pattern": "^[Hh][Tt][Tt][Pp][Ss]?://"
              }
          },
          "required": [
              "name",
              "websiteUrl",
              "privacyUrl",
              "termsOfUseUrl"
          ]
      },
      "name": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "tiny": {
                  "type": "string",
                  "description": "A shorter display name of the app, used on devices such as phone or tablet. If not provided, short name will be truncated to fit.",
                  "maxLength": 12
              },
              "short": {
                  "type": "string",
                  "description": "A short display name for the app.",
                  "maxLength": 30
              },
              "full": {
                  "type": "string",
                  "description": "The full name of the app, used if the full app name exceeds 30 characters.",
                  "maxLength": 100
              }
          },
          "required": [
              "short"
          ]
      },
      "description": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "short": {
                  "type": "string",
                  "description": "A short description of the app used when space is limited. Maximum length is 80 characters.",
                  "maxLength": 80
              },
              "full": {
                  "type": "string",
                  "description": "The full description of the app. Maximum length is 4000 characters.",
                  "maxLength": 4000
              }
          },
          "required": [
              "short",
              "full"
          ]
      },
      "icons": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "outline": {
                  "type": "string",
                  "description": "A relative file path to a transparent PNG outline icon. The border color needs to be white. Size 32x32.",
                  "maxLength": 2048
              },
              "color": {
                  "type": "string",
                  "description": "A relative file path to a full color PNG icon. Size 96x96.",
                  "maxLength": 2048
              }
          },
          "required": [
              "outline",
              "color"
          ]
      },
      "accentColor": {
          "type": "string",
          "description": "A color to use in conjunction with the icon. The value must be a valid HTML color code starting with '#', for example `#4464ee`.",
          "pattern": "^#[0-9a-fA-F]{6}$"
      },
      "configurableTabs": {
          "type": "array",
          "description": "These are tabs users can optionally add to their channels and 1:1 or group chats and require extra configuration before they are added. Configurable tabs are not supported in the personal scope. Currently only one configurable tab per app is supported.",
          "maxItems": 1,
          "items": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                  "configurationUrl": {
                      "type": "string",
                      "description": "The url to use when configuring the tab.",
                      "maxLength": 2048,
                      "pattern": "^[Hh][Tt][Tt][Pp][Ss]://"
                  },
                  "canUpdateConfiguration": {
                      "type": "boolean",
                      "description": "A value indicating whether an instance of the tab's configuration can be updated by the user after creation.",
                      "default": true
                  },
                  "scopes": {
                      "type": "array",
                      "description": "Specifies whether the tab offers an experience in the context of a channel in a team, in a 1:1 or group chat, or in an experience scoped to an individual user alone. These options are non-exclusive. Currently, configurable tabs are only supported in the teams and groupchats scopes.",
                      "maxItems": 2,
                      "items": {
                          "enum": [
                              "team",
                              "groupchat"
                          ]
                      }
                  },
                  "sharePointPreviewImage": {
                      "type": "string",
                      "description": "A relative file path to a tab preview image for use in SharePoint. Size 1024x768.",
                      "maxLength": 2048
                  },
                  "supportedSharePointHosts": {
                      "type": "array",
                      "description": "Defines how your tab will be made available in SharePoint.",
                      "maxItems": 2,
                      "uniqueItems": true,
                      "items": {
                          "enum": [
                              "sharePointFullPage",
                              "sharePointWebPart"
                          ]
                      }
                  },
                  "platforms": { 
                      "$ref": "#/definitions/platforms",
                      "description": "Specifies the platforms on which configurable tabs are displayed"
                  }
              },
              "required": [
                  "configurationUrl",
                  "scopes"
              ]
          }
      },
      "staticTabs": {
          "type": "array",
          "description": "A set of tabs that may be 'pinned' by default, without the user adding them manually. Static tabs declared in personal scope are always pinned to the app's personal experience. Static tabs do not currently support the 'teams' scope.",
          "maxItems": 16,
          "items": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                  "entityId": {
                      "type": "string",
                      "description": "A unique identifier for the entity which the tab displays.",
                      "maxLength": 64
                  },
                  "name": {
                      "type": "string",
                      "description": "The display name of the tab.",
                      "maxLength": 128
                  },
                  "contentUrl": {
                      "type": "string",
                      "description": "The url which points to the entity UI to be displayed in the Teams canvas.",
                      "maxLength": 2048,
                      "pattern": "^[Hh][Tt][Tt][Pp][Ss]://"
                  },
                  "websiteUrl": {
                      "type": "string",
                      "description": "The url to point at if a user opts to view in a browser.",
                      "maxLength": 2048,
                      "pattern": "^[Hh][Tt][Tt][Pp][Ss]://"
                  },
                  "scopes": {
                      "type": "array",
                      "description": "Specifies whether the tab offers an experience in the context of a channel in a team, or an experience scoped to an individual user alone. These options are non-exclusive. Currently static tabs are only supported in the 'personal' scope.",
                      "maxItems": 2,
                      "items": {
                          "enum": [
                              "team",
                              "personal"
                          ]
                      }
                  },
                  "platforms": {
                      "$ref": "#/definitions/platforms",
                      "description": "Specifies the platforms on which staticTabs tabs are displayed"
                  }
              },
              "required": [
                  "entityId",
                  "name",
                  "contentUrl",
                  "scopes"
              ]
          }
      },
      "bots": {
          "type": "array",
          "description": "The set of bots for this app. Currently only one bot per app is supported.",
          "maxItems": 1,
          "items": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                  "botId": {
                      "type": "string",
                      "description": "The Microsoft App ID specified for the bot in the Bot Framework portal (https://dev.botframework.com/bots)",
                      "maxLength": 64
                  },
                  "needsChannelSelector": {
                      "type": "boolean",
                      "description": "This value describes whether or not the bot utilizes a user hint to add the bot to a specific channel.",
                      "default": false
                  },
                  "isNotificationOnly": {
                      "type": "boolean",
                      "description": "A value indicating whether or not the bot is a one-way notification only bot, as opposed to a conversational bot.",
                      "default": false
                  },
                  "supportsFiles": {
                      "type": "boolean",
                      "description": "A value indicating whether the bot supports uploading/downloading of files.",
                      "default": false
                  },
                  "supportsCalling": {
                      "type": "boolean",
                      "description": "A value indicating whether the bot supports audio calling.",
                      "default": false
                  },
                  "supportsVideo": {
                      "type": "boolean",
                      "description": "A value indicating whether the bot supports video calling.",
                      "default": false
                  },
                  "scopes": {
                      "type": "array",
                      "description": "Specifies whether the bot offers an experience in the context of a channel in a team, in a 1:1 or group chat, or in an experience scoped to an individual user alone. These options are non-exclusive.",
                      "maxItems": 3,
                      "items": {
                          "enum": [
                              "team",
                              "personal",
                              "groupchat"
                          ]
                      }
                  },
                  "commandLists": {
                      "type": "array",
                      "maxItems": 3,
                      "description": "The list of commands that the bot supplies, including their usage, description, and the scope for which the commands are valid. A separate command list should be used for each scope.",
                      "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                              "scopes": {
                                  "type": "array",
                                  "description": "Specifies the scopes for which the command list is valid",
                                  "maxItems": 3,
                                  "items": {
                                      "enum": [
                                          "team",
                                          "personal",
                                          "groupchat"
                                      ]
                                  }
                              },
                              "commands": {
                                  "type": "array",
                                  "maxItems": 10,
                                  "items": {
                                      "type": "object",
                                      "additionalProperties": false,
                                      "properties": {
                                          "title": {
                                              "type": "string",
                                              "description": "The bot command name",
                                              "maxLength": 32
                                          },
                                          "description": {
                                              "type": "string",
                                              "description": "A simple text description or an example of the command syntax and its arguments.",
                                              "maxLength": 128
                                          }
                                      },
                                      "required": [
                                          "title",
                                          "description"
                                      ]
                                  }
                              }
                          },
                          "required": [
                              "scopes",
                              "commands"
                          ]
                      }
                  }
              },
              "required": [
                  "botId",
                  "scopes"
              ]
          }
      },
      "connectors": {
          "type": "array",
          "description": "The set of Office365 connectors for this app. Currently only one connector per app is supported.",
          "maxItems": 1,
          "items": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                  "connectorId": {
                      "type": "string",
                      "description": "A unique identifier for the connector which matches its ID in the Connectors Developer Portal.",
                      "maxLength": 64
                  },
                  "configurationUrl": {
                      "type": "string",
                      "description": "The url to use for configuring the connector using the inline configuration experience.",
                      "maxLength": 2048,
                      "pattern": "^[Hh][Tt][Tt][Pp][Ss]://"
                  },
                  "scopes": {
                      "type": "array",
                      "description": "Specifies whether the connector offers an experience in the context of a channel in a team, or an experience scoped to an individual user alone. Currently, only the team scope is supported.",
                      "maxItems": 1,
                      "items": {
                          "enum": [
                              "team"
                          ]
                      }
                  }
              },
              "required": [
                  "connectorId",
                  "scopes"
              ]
          }
      },
      "composeExtensions": {
          "type": "array",
          "description": "The set of compose extensions for this app. Currently only one compose extension per app is supported.",
          "maxItems": 1,
          "items": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                  "botId": {
                      "type": "string",
                      "description": "The Microsoft App ID specified for the bot powering the compose extension in the Bot Framework portal (https://dev.botframework.com/bots)",
                      "maxLength": 64
                  },
                  "canUpdateConfiguration": {
                      "type": "boolean",
                      "description": "A value indicating whether the configuration of a compose extension can be updated by the user.",
                      "default": false
                  },
                  "commands": {
                      "type": "array",
                      "maxItems": 10,
                      "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                              "id": {
                                  "type": "string",
                                  "description": "Id of the command.",
                                  "maxLength": 64
                              },
                              "type": {
                                  "type": "string",
                                  "enum": [ "query", "action" ],
                                  "description": "Type of the command",
                                  "default": "action"
                              },
                              "context": {
                                  "type": "array",
                                  "maxItems": 3,
                                  "items": {
                                      "enum": [
                                          "compose",
                                          "commandBox",
                                          "message"
                                      ]
                                  },
                                  "description": "Context where the command would apply",
                                  "default": ["compose","commandBox"]
                              },
                              "title": {
                                  "type": "string",
                                  "description": "Title of the command.",
                                  "maxLength": 32
                              },
                              "description": {
                                  "type": "string",
                                  "description": "Description of the command.",
                                  "maxLength": 128
                              },
                              "initialRun": {
                                  "type": "boolean",
                                  "description": "A boolean value that indicates if the command should be run once initially with no parameter.",
                                  "default": false
                              },
                              "fetchTask": {
                                  "type": "boolean",
                                  "description": "A boolean value that indicates if it should fetch task module dynamically",
                                  "default": false
                              },
                              "parameters": {
                                  "type": "array",
                                  "maxItems": 5,
                                  "minItems": 1,
                                  "items": {
                                      "type": "object",
                                      "additionalProperties": false,
                                      "properties": {
                                          "name": {
                                              "type": "string",
                                              "description": "Name of the parameter.",
                                              "maxLength": 64
                                          },
                                          "inputType": {
                                              "type": "string",
                                              "enum": [ "text", "textarea", "number", "date", "time", "toggle", "choiceset" ],
                                              "description": "Type of the parameter"
                                          },
                                          "title": {
                                              "type": "string",
                                              "description": "Title of the parameter.",
                                              "maxLength": 32
                                          },
                                          "description": {
                                              "type": "string",
                                              "description": "Description of the parameter.",
                                              "maxLength": 128
                                          },
                                          "value": {
                                              "type": "string",
                                              "description": "Initial value for the parameter",
                                              "maxLength": 512
                                          },
                                          "choices": {
                                              "type": "array",
                                              "maxItems": 10,
                                              "description": "The choice options for the parameter",
                                              "items": {
                                                  "type": "object",
                                                  "properties": {
                                                      "title": {
                                                          "type": "string",
                                                          "description": "Title of the choice",
                                                          "maxLength": 128
                                                      },
                                                      "value": {
                                                          "type": "string",
                                                          "description": "Value of the choice",
                                                          "maxLength": 512
                                                      }
                                                  },
                                                  "additionalProperties": false,
                                                  "required": [
                                                      "title",
                                                      "value"
                                                  ]
                                              }
                                          }
                                      },
                                      "required": [
                                          "name",
                                          "title"
                                      ]
                                  }
                              }
                          },
                          "required": [
                              "id",
                              "title",
                              "parameters"
                          ]
                      }
                  },
                  "messageHandlers": {
                      "type": "array",
                      "maxItems": 5,
                      "description": "A list of handlers that allow apps to be invoked when certain conditions are met",
                      "items": {
                          "type": "object",
                          "properties": {
                              "type": {
                                  "type": "string",
                                  "enum": [
                                      "Link"
                                  ],
                                  "description": "Type of the message handler"
                              },
                              "value": {
                                  "type": "object",
                                  "properties": {
                                      "domains": {
                                          "type": "array",
                                          "description": "A list of domains that the link message handler can register for, and when they are matched the app will be invoked",
                                          "items": {
                                              "type": "string",
                                              "maxLength": 2048
                                          }
                                      }
                                  }
                              }
                          },
                          "required": [
                              "type",
                              "value"
                          ],
                          "additionalProperties": false
                      }
                  }                
              },
              "required": [
                  "botId",
                  "commands"
              ]
          }
      },
      "permissions": {
          "type": "array",
          "description": "Specifies the permissions the app requests from users.",
          "maxItems": 2,
          "items": {
              "enum": [
                  "identity",
                  "messageTeamMembers"
              ]
          }
      },
      "devicePermissions": {
          "type": "array",
          "description": "Specifies the device capabilities the app can request access to.",
          "maxItems": 5,
          "items": {
              "enum": [
                  "geolocation",
                  "media",
                  "notifications",
                  "midi",
                  "openExternal"
              ]
          }
      },
      "validDomains": {
          "type": "array",
          "description": "A list of valid domains from which the tabs expect to load any content. Domain listings can include wildcards, for example `*.example.com`. If your tab configuration or content UI needs to navigate to any other domain besides the one use for tab configuration, that domain must be specified here.",
          "maxItems": 16,
          "items": {
              "type": "string",
              "maxLength": 2048
          }
      },
      "webApplicationInfo": {
          "type": "object",
          "properties": {
              "id": {
                  "type": "string",
                  "description": "AAD application id of the app. This id must be a GUID.",
                  "maxLength": 36,
                  "pattern": "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"
              },
              "resource": {
                  "type": "string",
                  "description": "Resource url of app for acquiring auth token for SSO.",
                  "maxLength": 2048
              }
          },
          "required": [
              "id",
              "resource"
          ],
          "additionalProperties": false
      }
  },
  "required": [
      "manifestVersion",
      "version",
      "id",
      "packageName",
      "developer",
      "name",
      "description",
      "icons",
      "accentColor"
  ]
};
var markdown = parse(schema);

fs.writeFile("./doc.md",markdown,function(error) {
  if(error) {
    return console.log(error);
  }
  else {
    console.log("woo");
  }
});

